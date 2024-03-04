import React from "react";
import { Typography, Link } from "@mui/material";
import PhoneIcon from "@mui/icons-material/Phone";
import RoomIcon from "@mui/icons-material/Room";
import EmailIcon from "@mui/icons-material/Email";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GitHubIcon from "@mui/icons-material/GitHub";

function Footer() {
  return (
    <div className="bg-black text-white">
      <div className="container mx-auto flex justify-between p-8">
        {/* left */}
        <div className="flex flex-col">
          <Typography
            variant="h5"
            className="text-3xl font-bold text-yellow-500 mb-2"
          >
            RentStation
          </Typography>

          <Typography variant="body1" className="text-gray-300 mb-2">
            <Link href="#" color="inherit">
              Home
            </Link>{" "}
            |
            <Link href="#" color="inherit">
              Blog
            </Link>{" "}
            |
            <Link href="#" color="inherit">
              Pricing
            </Link>{" "}
            |
            <Link href="#" color="inherit">
              About
            </Link>{" "}
            |
            <Link href="#" color="inherit">
              Faq
            </Link>{" "}
            |
            <Link href="#" color="inherit">
              Contact
            </Link>
          </Typography>

          <Typography variant="body2" className="text-yellow-500 text-sm">
            RentStation © 2022
          </Typography>
        </div>

        {/* middle */}
        <div className="flex flex-col mt-4">
          <div className="flex items-center mb-2">
            <RoomIcon
              className="bg-gray-700 rounded-full p-2 mr-2"
              fontSize="large"
            />
            <div>
              <Typography variant="body1" className="text-gray-300">
                444 S. Cedros Ave
                <br />{" "}
                <span className="text-yellow-500">Dibrugarh Assam, India</span>
              </Typography>
            </div>
          </div>

          <div className="flex items-center mb-2">
            <PhoneIcon
              className="bg-gray-700 rounded-full p-2 mr-2"
              fontSize="large"
            />
            <Typography variant="body1" className="text-gray-300">
              +1.555.555.5555
            </Typography>
          </div>

          <div className="flex items-center">
            <EmailIcon
              className="bg-gray-700 rounded-full p-2 mr-2"
              fontSize="large"
            />
            <Typography variant="body1" className="text-gray-300">
              <Link
                href="mailto:support@company.com"
                color="inherit"
                className="hover:underline"
              >
                support@company.com
              </Link>
            </Typography>
          </div>
        </div>

        {/* right */}
        <div className="flex flex-col mt-4">
          <Typography variant="body1" className="text-gray-300 mb-2">
            <span className="text-yellow-500 font-semibold">
              About the company
            </span>
            <br />
            <Typography variant="body2" className="text-gray-300">
              The RentStation sets up an online renting platform for customers
              to rent things according to the categories mentioned in the
              RentStation.
            </Typography>
          </Typography>

          <div className="flex mt-4">
            <Link href="#" color="inherit" className="mr-4 hover:text-black">
              <FacebookIcon fontSize="large" />
            </Link>
            <Link href="#" color="inherit" className="mr-4 hover:text-black">
              <TwitterIcon fontSize="large" />
            </Link>
            <Link href="#" color="inherit" className="mr-4 hover:text-black">
              <LinkedInIcon fontSize="large" />
            </Link>
            <Link href="#" color="inherit" className="hover:text-black">
              <GitHubIcon fontSize="large" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
