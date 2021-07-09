import React from 'react'
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div>
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
              <h1 className="x-large">Dev and Design - Connected
               </h1>
              <h2> Developers + Designers = Devigners</h2>
          <p className="lead">
           Share your portfolio, posts, ideas, and questions with other web creators.
          </p>
          <div className="buttons">
            <Link to="/register" class="btn btn-primary">Sign Up</Link>
            <Link to="/login" class="btn btn-light">Login</Link>
          </div>
        </div>
      </div>
    </section>
        </div>
    )
}

export default Landing
