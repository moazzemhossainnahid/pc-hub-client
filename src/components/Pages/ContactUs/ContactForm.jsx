const ContactForm = () => {
  return (
    <>
      <div className="px-12 pt-10 pb-5 shadow-lg text-[#222222] lg:mt-[-220px] lg:z-40 bg-white">
        <h2 className="text-4xl font-semibold mb-4">Fill Out For Contact</h2>
        <p>
          Fill in the contact form and get immediate assistance from our
          educational consultant.
        </p>
        <form>
          <input
            name="name"
            className="block w-full h-10 pl-2 border-2 border-[#d8dada] my-5"
            type="text"
            id=""
            placeholder="Your Name"
          />
          <input
            name="email"
            className="block w-full h-10 pl-2 border-2 border-[#d8dada] mb-5"
            type="email"
            id=""
            placeholder="Email address"
          />
          <input
            name="subject"
            className="block w-full h-10 pl-2 border-2 border-[#d8dada] mb-5"
            type="text"
            id=""
            placeholder="Subject"
          />
          <textarea
            name="message"
            className="block w-full h-32 resize-none pl-2 border-2 border-[#d8dada] mb-5"
            type="text"
            id=""
            placeholder="Your message"
          ></textarea>
          <input
            className="block h-10 px-7 bg-[#015abd] text-white cursor-pointer uppercase my-4"
            type="submit"
            value="Send now"
          />
        </form>
      </div>
    </>
  );
};

export default ContactForm;
