import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white pt-10 pb-6 mt-10">
      <div className="container mx-auto px-4">

        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">

          {/* Logo / Brand */}
          <div className="text-center md:text-left">
            <h2 className="text-3xl font-extrabold tracking-wide">
              Job <span className="text-purple-400">Hunt</span>
            </h2>
            <p className="text-gray-400 text-sm mt-1">
              Find your dream job effortlessly 🚀
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 md:space-x-6">
            {[
              { href: "https://www.facebook.com/profile.php?id=61574501951819", color: "bg-blue-600", svgPath: "M22.676 0H1.324C.593 0 0 .592 0 1.324v21.352C0 23.408.593 24 1.324 24H12.82V14.706H9.692v-3.578h3.128V8.408c0-3.1 1.893-4.787 4.657-4.787 1.325 0 2.463.1 2.794.144v3.238l-1.918.001c-1.503 0-1.794.715-1.794 1.762v2.31h3.587l-.468 3.578h-3.119V24h6.116C23.407 24 24 23.408 24 22.676V1.324C24 .592 23.407 0 22.676 0z" },
              { href: "https://x.com/prakash_793", color: "bg-sky-500", svgPath: "M24 4.557a9.835 9.835 0 01-2.828.775 4.934 4.934 0 002.165-2.724 9.867 9.867 0 01-3.127 1.195 4.924 4.924 0 00-8.38 4.49A13.978 13.978 0 011.67 3.149 4.93 4.93 0 003.16 9.724a4.903 4.903 0 01-2.229-.616v.062a4.93 4.93 0 003.946 4.827 4.902 4.902 0 01-2.224.084 4.93 4.93 0 004.6 3.417A9.869 9.869 0 010 21.543a13.978 13.978 0 007.548 2.212c9.057 0 14.01-7.507 14.01-14.01 0-.213-.004-.425-.015-.636A10.012 10.012 0 0024 4.557z" },
              { href: "https://www.linkedin.com/in/jyothiprakashchinni/", color: "bg-blue-500", svgPath: "M20.447 20.452H16.85v-5.569c0-1.327-.027-3.037-1.852-3.037-1.854 0-2.137 1.446-2.137 2.94v5.666H9.147V9.756h3.448v1.464h.05c.48-.91 1.653-1.871 3.401-1.871 3.634 0 4.307 2.39 4.307 5.498v5.605zM5.337 8.29c-1.105 0-2-.896-2-2 0-1.106.895-2 2-2 1.104 0 2 .895 2 2 0 1.104-.896 2-2 2zM7.119 20.452H3.553V9.756h3.566v10.696z" }
            ].map((icon, index) => (
              <a
                key={index}
                href={icon.href}
                target="_blank"
                rel="noreferrer"
                className={`p-3 rounded-full ${icon.color} hover:brightness-125 transition transform hover:scale-110`}
              >
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d={icon.svgPath} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
          <p>© 2026 JobHunt. All rights reserved.</p>
          {/* <p className="mt-2 md:mt-0">Made with ❤️ by <span className="text-purple-400 font-semibold">Jyothi Prakash</span></p> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;