import React, { useEffect, useRef, useState, useContext } from "react";
import {io} from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import { CallContext } from "../../callContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { Avatar } from "@material-ui/core";
const Container = styled.div`
    padding: 20px;
    display: flex;
    height: 100vh;
    width: 90%;
    margin: auto;
    flex-wrap: wrap;
`;

const StyledVideo = styled.video`
    height: 40%;
    width: 50%;
`;

const Video = (props) => {
    const ref = useRef();

    useEffect(() => {
        props.peer.on("stream", stream => {
            ref.current.srcObject = stream;
        })
    }, []);

    return (
        <StyledVideo playsInline autoPlay ref={ref} />
    );
}




const Room = ({roomID}) => {
    const { audioOnly} = useContext(CallContext);
    const [user] = useAuthState(auth);
    const [audio, setAudio] = useState(true);
    const [videoAdd, setVideoAdd] = useState(!audioOnly);
    const [peers, setPeers] = useState([]);
    const socketRef = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);

    useEffect(async () => {
        const videoConstraints = videoAdd?{
            height: window.innerHeight / 2,
            width: window.innerWidth / 2
        }:{height: 0,
        width: 0};
        console.log(audioOnly)
        socketRef.current = io.connect(process.env.NEXT_PUBLIC_SERVER);
        navigator.mediaDevices.getUserMedia({ video: videoConstraints, audio: true }).then(stream => {
            userVideo.current.srcObject = stream;
            socketRef.current.emit("join room", {roomID, codeword:process.env.NEXT_PUBLIC_CODEWORD});
            socketRef.current.on("all users", users => {
                const peers = [];
                users.forEach(userID => {
                    const peer = createPeer(userID, socketRef.current.id, stream);
                    peersRef.current.push({
                        peerID: userID,
                        peer,
                    })
                    peers.push(peer);
                })
                setPeers(peers);
            })

            socketRef.current.on("user joined", payload => {
                const peer = addPeer(payload.signal, payload.callerID, stream);
                peersRef.current.push({
                    peerID: payload.callerID,
                    peer,
                })

                setPeers(users => [...users, peer]);
            });

            socketRef.current.on("receiving returned signal", payload => {
                const item = peersRef.current.find(p => p.peerID === payload.id);
                item.peer.signal(payload.signal);
            });
        })
    }, []);

    function createPeer(userToSignal, callerID, stream) {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream,
        });

        peer.on("signal", signal => {
            socketRef.current.emit("sending signal", { userToSignal, callerID, signal })
        })

        return peer;
    }

    function addPeer(incomingSignal, callerID, stream) {
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream,
        })

        peer.on("signal", signal => {
            socketRef.current.emit("returning signal", { signal, callerID })
        })

        peer.signal(incomingSignal);

        return peer;
    }

    return (
        <Container>
            {videoAdd?<StyledVideo muted ref={userVideo} autoPlay playsInline />:<UserAvatar src={user.photoURL} />}
            {peers.map((peer, index) => {
                return (
                    <Video key={index} peer={peer} />
                );
            })}
        </Container>
    );
};

export default Room;
export function getServerSideProps(context) {
    return { props: { roomID: context.query.id} };
  }
  const UserAvatar = styled(Avatar)`
  cursor: pointer;
  :hover {
    opacity: 0.8;
  }
`;