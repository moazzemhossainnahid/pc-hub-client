const ContactUsAddressItem = ({ icon,text }) => {
  return (
    <p className=" flex gap-1 items-center mb-2">
      {icon}
      <span className="text-dark">{text}</span>
    </p>
  );
};

export default ContactUsAddressItem;
