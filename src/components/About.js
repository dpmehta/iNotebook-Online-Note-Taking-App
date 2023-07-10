import React from "react";
import "../App.css";

const About = () => {
  return (
    <div className="about-img">
      <div className="heading-container">
        <h2 id="main-heading">ABOUT US</h2>
      </div>
      <div className="note-card">
        <h3 className="title">User Benefits</h3>
        <hr className="ruler" />
        <p className="desc">
          Access your notes from any device with an internet connection. Whether
          you're on your computer, tablet, or smartphone, our application
          ensures that your notes are always within reach.
        </p>
      </div>
      <div className="note-card" id="card-2">
        <h3 className="title">Cross-Platform</h3>
        <hr className="ruler" />
        <p className="desc">
          Sync your notes across multiple devices and platforms. Start taking
          notes on your laptop and seamlessly continue on your mobile device
          without missing a beat..
        </p>
      </div>
      <div className="note-card" id="card-3">
        <h3 className="title">Offline Access</h3>
        <hr className="ruler" />
        <p className="desc">
          Enjoy the flexibility of accessing your notes even when you're
          offline. Our application offers offline mode, allowing you to view and
          edit your notes without an internet connection.
        </p>
      </div>
      <div className="note-card" id="card-4">
        <h3 className="title">Note Creation</h3>
        <hr className="ruler" />
        <p className="desc">
          Easily create new notes with a title, description, and tags. Our
          intuitive interface allows you to quickly jot down your thoughts and
          categorize them for better organization.
        </p>
      </div>
      <div className="note-card" id="card-5">
        <h3 className="title">Note Updates</h3>
        <hr className="ruler" />
        <p className="desc">
          Seamlessly update your existing notes whenever you need to make
          changes or add more information. Keep your notes up to date without
          any hassle.
        </p>
      </div>
      <div className="note-card" id="card-6">
        <h3 className="title">Note Deletion</h3>
        <hr className="ruler" />
        <p className="desc">
          Delete notes that are no longer needed or relevant. Our app provides a
          simple process to remove notes from your collection, helping you
          maintain a clutter-free workspace.
        </p>
      </div>
    </div>
  );
};

export default About;
