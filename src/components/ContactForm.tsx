
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { useSound } from './SoundContext';

const ContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { playHover, playClick, playSuccess } = useSound();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setIsSubmitting(true);
    
    // Simulating form submission
    setTimeout(() => {
      toast.success('Message sent successfully!');
      playSuccess();
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
          <Input
            id="name"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
            onMouseEnter={playHover}
            className="bg-secondary border-accent"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="your.email@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            onMouseEnter={playHover}
            className="bg-secondary border-accent"
          />
        </div>
      </div>
      <div>
        <label htmlFor="subject" className="block text-sm font-medium mb-1">Subject</label>
        <Input
          id="subject"
          name="subject"
          placeholder="How can I help you?"
          value={formData.subject}
          onChange={handleChange}
          required
          onMouseEnter={playHover}
          className="bg-secondary border-accent"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm font-medium mb-1">Message</label>
        <Textarea
          id="message"
          name="message"
          placeholder="Your message here..."
          rows={6}
          value={formData.message}
          onChange={handleChange}
          required
          onMouseEnter={playHover}
          className="bg-secondary border-accent"
        />
      </div>
      <Button 
        type="submit" 
        disabled={isSubmitting}
        onMouseEnter={playHover}
        className="w-full bg-primary hover:bg-primary/80 text-primary-foreground"
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </Button>
    </form>
  );
};

export default ContactForm;
