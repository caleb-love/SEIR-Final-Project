import React, { useState, useLayoutEffect, useCallback } from 'react';
import { GiftedChat, Bubble } from 'react-native-gifted-chat';
import { collection, addDoc, orderBy, query, onSnapshot } from 'firebase/firestore';
import { auth, database } from '../config/firebase';
import { Image, TouchableOpacity } from 'react-native';
import { ProfilePicture } from '../assets';


export default function Chat() {
    const [messages, setMessages] = useState([]);

    useLayoutEffect(() => {
        const chatsRef = collection(database, 'chats');
        const q = query(chatsRef, orderBy('createdAt', 'desc'));

        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newMessages = querySnapshot.docs.map((doc) => {
                const { _id, createdAt, text, user } = doc.data();
                return {
                    _id,
                    createdAt: createdAt.toDate(),
                    text,
                    user,
                };
            });
            setMessages(newMessages);
        });
        return unsubscribe;
    }, []);

    const onSend = useCallback((newMessages = []) => {
        const [message] = newMessages;
        const { _id, createdAt, text, user } = message;

        setMessages((previousMessages) => GiftedChat.append(previousMessages, newMessages));

        addDoc(collection(database, 'chats'), {
            _id,
            createdAt,
            text,
            user,
        });
    }, []);

    return (
            <GiftedChat
                messages={messages}
                showAvatarForEveryMessage={false}
                showUserAvatar={false}
                onSend={onSend}
                messagesContainerStyle={{
                    backgroundColor: '#fff',
                }}
                textInputStyle={{
                    backgroundColor: '#fff',
                    borderRadius: 20,
                    paddingHorizontal: 16,
                    paddingVertical: 10,
                    height: 50,
                    fontSize: 16,
                    lineHeight: 20,
                    borderWidth: 1,
                    borderColor: '#ccc',
                    marginBottom: 8,
                }}
                user={{
                    _id: auth?.currentUser?.email,
                    avatar: (
                        <Image source={ProfilePicture} style={{ width: 40, height: 40, borderRadius: 20 }} />
                    ),
                }}
            />

    );
}
