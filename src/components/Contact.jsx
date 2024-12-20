import React, { useRef, useState } from 'react';

const Contact = () => {
    const scriptURL = 'https://script.google.com/macros/s/AKfycbznv6eS0d_-dZIoF8OQz06n5j1PgjS7Wg6odP50CNX0qQ61lY6O7dn6vKcXgPX51GF-JA/exec';
    const formRef = useRef(null);
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        setMessage("Sending your message...");
        setMessageType("info");

        fetch(scriptURL, { method: 'POST', body: new FormData(formRef.current) })
            .then(response => {
                if (!response.ok) throw new Error('Network response was not ok');
                return response.json();
            })
            .then(data => {
                setMessage("Message sent successfully!");
                setMessageType("success");
                formRef.current.reset();
                setTimeout(() => setMessage(""), 5000);
            })
            .catch(error => {
                setMessage("Error sending message!");
                setMessageType("error");
                console.error('Error!', error.message);
            });
    };

    return (
        <div className="flex justify-center my-5 h-full sm:h-[70vh] items-center" id='contact'>
            <div className="max-w-[1200px] mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    <div className="p-6 mr-2 bg-gray-800 rounded-xl flex flex-col justify-around">
                        <h1 className="text-4xl sm:text-5xl text-white">
                            Contact <span>Me</span>
                        </h1>
                        <p className="text-normal text-lg text-gray-400 mt-2">
                        Get in Touch <br /> I’d love to hear from you.<br />Feel free to reach out anytime!
                        </p>
                    </div>

                    <form ref={formRef} onSubmit={handleSubmit} className="p-6 flex flex-col justify-center max-w-[700px]">
                        <input type="text" name="name" placeholder="Full Name" className="w-100 mt-2 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white" required />
                        <input type="email" name="email" placeholder="Email" className="w-100 mt-2 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white" required />
                        <textarea name="message" placeholder="Your Message" className="w-100 mt-2 p-3 rounded-lg bg-gray-800 border border-gray-700 text-white" required></textarea>
                        <button type="submit" className="bg-primary-color text-white py-3 px-6 rounded-lg mt-3">Submit</button>
                        {message && (
                            <div className={`mt-3 ${messageType === 'success' ? 'text-green-500' : 'text-red-500'}`}>
                                {message}
                            </div>
                        )}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Contact;