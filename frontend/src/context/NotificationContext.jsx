// context/NotificationContext.js
import { createContext, useContext, useRef, useState } from 'react';
import { Notification, Lucide } from '@/base-components';

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const [notification, setNotification] = useState({ message: '', type: '' });
    const successNotification = useRef();
    const errorNotification = useRef();

    const showNotification = (message, isSuccess = true) => {
        setNotification({ message, type: isSuccess ? 'success' : 'error' });
        {isSuccess ? successNotification.current.showToast() : errorNotification.current.showToast()}
        setTimeout(() => {
            setNotification({ message: '', type: '' }); // Clear notification after 3 seconds
        }, 3000);
    };

    return (
        <NotificationContext.Provider value={{ showNotification, notification }}>
            {children}
            {/* Notification component to display the notification */}
            {notification.message && (
                <Notification
                    getRef={(el) => {
                        if (notification.type === 'success') {
                            successNotification.current = el;
                        } else {
                            errorNotification.current = el;
                        }
                    }}
                    options={{ duration: 3000 }}
                    className={`flex ${notification.type === 'success' ? 'bg-green-100' : 'bg-red-100'}`}
                >
                    {notification.type === 'success' ? (
                        <>
                            <Lucide icon="CheckCircle" className="text-success" />
                            <div className="ml-4 mr-4">
                                <div className="font-medium">Success!</div>
                                <div className="text-slate-500 mt-1">{notification.message}</div>
                            </div>
                        </>
                    ) : (
                        <>
                            <Lucide icon="XCircle" className="text-danger" />
                            <div className="ml-4 mr-4">
                                <div className="font-medium">Error!</div>
                                <div className="text-slate-500 mt-1">{notification.message}</div>
                            </div>
                        </>
                    )}
                </Notification>
            )}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => useContext(NotificationContext);
