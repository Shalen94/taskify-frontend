import React from 'react'
import luffy from './../assets/luffy3.jpg'
const About = () => {
  return (
    <div className='about'>
        <section id="contact" data-aos="fade-up">
            <div class="card contact-card text-center p-4">
                <img src={luffy} alt="Profile pic" />
                <div class="card-body">
                <h3 class="card-title">Monkey D. Obito</h3>
                <p class="text-muted">Future King of the Pirates 🏴‍☠️</p>
                <p><strong>📞 Phone:</strong> +91 80084 32165</p>
                <p><strong>📧 Email:</strong> <a href="mailto:javamintech@gmail.com">javamintech@gmail.com</a></p>
                <p>
                    I'm the Captain of the Uchiha Pirates, navigating the world of code like the Grand Line. A full-stack developer with expertise in QR-based ticket systems, real-time platforms, and web architecture. Passionate about building smart, scalable solutions that solve real-world problems. By day, I write code; by night, I draw strength from anime legends. Let’s connect and conquer!
                </p>

                </div>
            </div>
            </section>
    </div>
  )
}

export default About