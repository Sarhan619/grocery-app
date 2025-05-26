import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 mt-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Contact Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Send Us a Message</h2>
            <form>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="John Doe"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="johndoe@example.com"
                  />
                </div>
              </div>
              
              <div className="mb-4">
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="How can we help you?"
                />
              </div>
              
              <div className="mb-4">
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                  placeholder="Write your message here..."
                ></textarea>
              </div>
              
              <button
                type="submit"
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-md font-medium transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
          
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-semibold mb-4">Store Hours</h2>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Monday - Friday</span>
                <span className="font-medium">8:00 AM - 9:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Saturday</span>
                <span className="font-medium">9:00 AM - 8:00 PM</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Sunday</span>
                <span className="font-medium">10:00 AM - 6:00 PM</span>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
            
            <div className="space-y-6">
              <ContactItem 
                icon={<MapPin className="h-6 w-6 text-green-600" />}
                title="Our Location"
                content="123 Grocery Lane, Fresh Market, California 90210"
              />
              
              <ContactItem 
                icon={<Phone className="h-6 w-6 text-green-600" />}
                title="Phone Number"
                content="(555) 123-4567"
              />
              
              <ContactItem 
                icon={<Mail className="h-6 w-6 text-green-600" />}
                title="Email Address"
                content="info@freshmart.com"
              />
              
              <ContactItem 
                icon={<Clock className="h-6 w-6 text-green-600" />}
                title="Customer Support"
                content="Available 7 days a week from 8:00 AM to 10:00 PM"
              />
            </div>
          </div>
          
          {/* Map placeholder - in a real implementation, this would be a Google Maps embed */}
          <div className="rounded-lg overflow-hidden shadow-sm h-80 bg-gray-200 flex items-center justify-center">
            <div className="text-center px-4">
              <MapPin className="h-10 w-10 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-600">Map would be displayed here</p>
              <p className="text-sm text-gray-500">123 Grocery Lane, Fresh Market, CA</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-12 bg-white rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <FaqItem 
            question="Do you offer home delivery?" 
            answer="Yes, we offer free home delivery for orders above $50 within a 10-mile radius of our store. For orders under $50, a delivery fee of $5 is applicable."
          />
          
          <FaqItem 
            question="What payment methods do you accept?" 
            answer="We accept all major credit cards, debit cards, PayPal, and cash on delivery."
          />
          
          <FaqItem 
            question="Can I return products if I'm not satisfied?" 
            answer="Absolutely! We have a 100% satisfaction guarantee. If you're not happy with any product, simply return it within 7 days with your receipt for a full refund or exchange."
          />
          
          <FaqItem 
            question="Do you offer organic products?" 
            answer="Yes, we have a wide selection of certified organic fruits, vegetables, dairy products, and more. Look for the 'Organic' label when shopping."
          />
        </div>
      </div>
    </div>
  );
};

interface ContactItemProps {
  icon: React.ReactNode;
  title: string;
  content: string;
}

const ContactItem: React.FC<ContactItemProps> = ({ icon, title, content }) => {
  return (
    <div className="flex">
      <div className="mr-4">{icon}</div>
      <div>
        <h3 className="font-medium text-gray-800">{title}</h3>
        <p className="text-gray-600">{content}</p>
      </div>
    </div>
  );
};

interface FaqItemProps {
  question: string;
  answer: string;
}

const FaqItem: React.FC<FaqItemProps> = ({ question, answer }) => {
  const [isOpen, setIsOpen] = React.useState(false);
  
  return (
    <div className="border border-gray-200 rounded-md overflow-hidden">
      <button
        className="w-full px-6 py-4 text-left bg-gray-50 hover:bg-gray-100 focus:outline-none flex justify-between items-center"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{question}</span>
        <span className="text-green-600 text-xl">{isOpen ? '−' : '+'}</span>
      </button>
      
      <motion.div
        initial={false}
        animate={{ height: isOpen ? 'auto' : 0 }}
        className="overflow-hidden"
      >
        <div className="px-6 py-4 bg-white">
          <p className="text-gray-600">{answer}</p>
        </div>
      </motion.div>
    </div>
  );
};

export default ContactPage;