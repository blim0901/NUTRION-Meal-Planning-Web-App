import React from 'react';
import '../styles/Footer.css';
import {FaFacebook,FaTwitter,FaDribbble,FaLinkedin} from 'react-icons/fa';

function Footer(){
    return(
    <footer class="site-footer">
      <div class="container">
        <div class="row">
          <div class="col-sm-12 col-md-6">
            <h6>About</h6>
            <p class="text-justify">NUTRION <i>-be healthy- </i> is an initiative to help health enthusiasts and individuals with strict dietary restrictions due to disease or self-preference in pursuing a healthier lifestyle. By providing and integrating information about healthy foods that are categorized based on keywords such as nutrients and ingredients, users of NUTRION will be able to explore the foods they need in order toachieve a healthier diet. Other than that, by using a weekly meal plan planner, users of NUTRION will be able to oversee their weekly diet goals and summary of their weekly meal plan details. Information such as the description of weekly meal plans, dishes and their respective price will be made available to provide an informative platform for our users.
            </p>
            </div>

          <div class="col-xs-6 col-md-3">
            <h6>Categories</h6>
            <ul class="footer-links">
              <li><a href="http://www.google.com">Home</a></li>
              <li><a href="http://www.google.com">Recipe</a></li>
              <li><a href="http://www.google.com">MealPlan</a></li>
              <li><a href="http://www.google.com">Planner</a></li>
              <li><a href="http://www.google.com">Profile</a></li>
            </ul>
          </div>

          <div class="col-xs-6 col-md-3">
            <h6>Quick Links</h6>
            <ul class="footer-links">
              <li><a href="http://www.google.com">About Us</a></li>
              <li><a href="http://www.google.com">Contact Us</a></li>
              <li><a href="http://www.google.com">Contribute</a></li>
              <li><a href="http://www.google.com">Privacy Policy</a></li>
              <li><a href="http://www.google.com">Sitemap</a></li>
            </ul>
          </div>
        </div>
        <hr />
      </div>
      <div class="container">
        <div class="row">
          <div class="col-md-8 col-sm-6 col-xs-12">
            <p class="copyright-text">Copyright &copy; 2021 All Rights Reserved by  
         <a href="http://www.google.com"> TEAM6</a>.
            </p>
          </div>

          <div class="col-md-4 col-sm-6 col-xs-12">
            <ul class="social-icons">
              <li><a class="facebook" href="http://www.google.com"><FaFacebook/></a></li>
              <li><a class="twitter" href="http://www.google.com"><FaTwitter/></a></li>
              <li><a class="dribbble" href="http://www.google.com"><FaDribbble/></a></li>
              <li><a class="linkedin" href="http://www.google.com"><FaLinkedin/></a></li>   
            </ul>
          </div>
        </div>
      </div>
    </footer>
    );

}

export default Footer;