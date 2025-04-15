import { Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from 'flowbite-react'
import React from 'react'
import { Link } from 'react-router-dom'
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const FooterComponent = () => {
  return (
    <Footer container className='border-t-2'>

      <div className='w-full max-w-7xl mx-auto'>

        <div className='grid w-full justify-between sm:flex md:grid-cols-1'>

          {/* logo */}
          <div className='mt-5'>
            <Link to="/" className='self-center whitespace-nowrap text-2xl ml-10'>
              <div className='flex items-center'>
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold">
                  B
                </div>
                <span className="font-bold  ml-1  dark:text-white">
                  Blog<span className="text-purple-600">Stack</span>
                </span>
              </div>
            </Link>
          </div>
          {/* grid  */}
          <div className="grid grid-cols-2 gap-8 mt-7 sm:mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="about" />
              <FooterLinkGroup col>
                <FooterLink href="#">BlogStack</FooterLink>
                {/* <FooterLink href="#">Tailwind CSS</FooterLink> */}
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Follow us" />
              <FooterLinkGroup col>
                <FooterLink href="#">Github</FooterLink>
                <FooterLink href="#">Discord</FooterLink>
              </FooterLinkGroup>
            </div>
            <div>
              <FooterTitle title="Legal" />
              <FooterLinkGroup col>
                <FooterLink href="#">Privacy Policy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditions</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>

        </div>

        <div>
          <FooterDivider />
          <div className="w-full sm:flex sm:items-center sm:justify-between">
            <FooterCopyright href="#" by="BlogStack™" year={new Date().getFullYear()} />
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center">
              <FooterIcon href="#" icon={BsFacebook} />
              <FooterIcon href="#" icon={BsInstagram} />
              <FooterIcon href="#" icon={BsTwitter} />
              <FooterIcon href="#" icon={BsGithub} />
              <FooterIcon href="#" icon={BsDribbble} />
            </div>
          </div>
        </div>

      </div>
    </Footer>
  )
}

export default FooterComponent