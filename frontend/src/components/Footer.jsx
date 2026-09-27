import { Link } from 'react-router-dom';
import { Phone, Mail, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-[#0A0A0A] pt-24 pb-8 border-t border-gray-800 dark:border-white/5 relative overflow-hidden transition-colors duration-300">
      
      {/* Subtle Background Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C49A45] rounded-full blur-[150px] opacity-[0.03] pointer-events-none"></div>

      <div className="max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-20">
          
          {/* Column 1: Brand */}
          <div className="lg:col-span-4">
            <Link to="/" className="flex flex-col mb-6 inline-block">
              <span className="text-[#C49A45] text-2xl leading-none mb-1">👑</span>
              <span className="text-white font-black text-2xl tracking-tight">DA-WINGS GLOBAL</span>
            </Link>
            <p className="text-gray-300 dark:text-gray-400 text-sm leading-relaxed mb-8 max-w-sm">
              Premium embroidery digitizing and monogram services. We preserve the soul of African fashion through world-class precision technology.
            </p>
            <div className="flex gap-4">
              {[
                { name: 'Facebook', svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg> },
                { name: 'X', svg: <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path></svg> },
                { name: 'Instagram', svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg> },
                { name: 'LinkedIn', svg: <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg> }
              ].map((item, i) => (
                <a key={i} href="#" aria-label={item.name} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-[#C49A45] hover:bg-[#C49A45]/10 transition-all duration-300">
                  {item.svg}
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h4 className="text-white font-bold tracking-widest text-[11px] uppercase mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {[
                { name: 'Home', href: '/' },
                { name: 'About Us', href: '/about' },
                { name: 'Portfolio', href: '/portfolio' },
                { name: 'Sell Your Designs', href: '/register' },
                { name: 'Contact', href: '/contact' },
              ].map((link, i) => (
                <li key={i}>
                  <a href={link.href} className="text-gray-400 text-sm hover:text-[#C49A45] transition-colors flex items-center gap-2 group">
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-[#C49A45]">―</span>
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-2">
            <h4 className="text-white font-bold tracking-widest text-[11px] uppercase mb-6">Services</h4>
            <ul className="space-y-4">
              {['Agbada Digitizing', 'Cap Monograms', 'Corporate Logos', 'Custom Embroidery', 'Agent Network'].map((link, i) => (
                <li key={i}>
                  <a href="#" className="text-gray-400 text-sm hover:text-[#C49A45] transition-colors flex items-center gap-2 group">
                    <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300 text-[#C49A45]">―</span>
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Newsletter & Contact */}
          <div className="lg:col-span-3">
            <h4 className="text-white font-bold tracking-widest text-[11px] uppercase mb-6">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Subscribe for exclusive designs and agent opportunities.</p>
            
            <form className="relative mb-8 group">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="w-full bg-white/5 border border-white/10 rounded-sm py-3 px-4 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-[#C49A45] transition-colors"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#C49A45] hover:bg-white text-white hover:text-black rounded-sm flex items-center justify-center transition-colors">
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="space-y-3">
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Mail className="w-4 h-4 text-[#C49A45]" />
                <span className="text-sm">info@dawingsglobal.com</span>
              </div>
              <div className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Phone className="w-4 h-4 text-[#C49A45]" />
                <span className="text-sm">+234 801 234 5678</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © 2026 DA-WINGS GLOBAL. All Rights Reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-500 font-medium">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
