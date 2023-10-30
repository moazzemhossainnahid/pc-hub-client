import React from "react";

const RefundPolicyPage = () => {
  return (
    <div className="w-full py-10 p-5">
      <div className="w-full lg:w-5/6 mx-auto">
        <h2 className="font-bold text-3xl text-gray-600">
          Cancellation & Refund Policy
        </h2>
      </div>
      <div className="w-full lg:w-5/6 pt-7 mx-auto">
        <h2 className="font-bold text-2xl text-gray-600">What is a refund?</h2>
        <p className="pt-5">
          When a learner is unable to access the course due to technical issues
          in the app/website , or doesn’t receive resources as promised in the
          course or mistakenly purchased a course instead of another course of
          Digital Marketing Institute BD, the user can request for a refund which shall then
          go through the verification process.
        </p>
      </div>
      <div className="w-full lg:w-5/6 mx-auto pt-10">
        <h3 className="font-bold text-xl text-gray-700">
          How to request a refund?
        </h3>
        <p className="pt-5 list-disc">
          If you have paid for an individual course or a bundle course, you can
          request a refund within 48 hours of your payment.
        </p>
        <p className="pt-5">
          Refund requests are only considered valid if contacted and informed
          via calling 16910 within 48 hours of purchase clearly specifying your
          email address and phone number used during registration.
        </p>
        <p className="pt-5">
          N.B.~Refunds do not apply to e-books. And refund for subscription
          based courses will not be applicable if a refund request is submitted
          after class has started for that course.
        </p>
        <p className="pt-5">
          Refund shall be made to the medium through which a customer has made
          the payment or in the form of voucher within 7-14 working days of
          successful processing and approval of the refund request by Digital Marketing Institute BD. This confirmation will be emailed to the user.
        </p>
      </div>
      <div className="w-full lg:w-5/6 mx-auto pt-10">
        <h3 className="font-bold text-xl text-gray-700">
          When will the refund not be applicable?
        </h3>
        <li className="pt-5 list-disc">
          In case you have submitted the complaint or refund request after 48
          hours from the date of purchase.
        </li>
        <li className="pt-5">
          In case you have already earned your Course Certificate within the
          48-hour complaint period, you are no longer eligible for a refund.
        </li>
        <li className="pt-5">
          If you file a complaint within the 48-hour complaint period and earn
          the course certificate within the next 7-day refund period, you will
          not be entitled to a refund.
        </li>
        <li className="pt-5">
          When you request a refund, the refund process will be in progress.
          Therefore, if you complete an activity (play a video, try a quiz or
          test, download materials of the specific course) and proceed with the
          course, you will not be eligible for a refund request.
        </li>
        <li className="pt-5">
          If you complete more than 5 premium/paid videos before requesting a
          refund, you will not be eligible for a refund.
        </li>
        <li className="pt-5">If you have purchased an e-book.</li>
        <li className="pt-5">
          If you have purchased a subscription based course and class has
          started for that course.
        </li>
      </div>
      <div className="w-full lg:w-5/6 mx-auto pt-10">
        <h3 className="font-bold text-xl text-gray-700">
          When will the refund be applicable?
        </h3>
        <li className="pt-5 list-disc">
          In case of a wrong purchase or if the customer is willing to purchase
          another course, a transfer to another course can be done through
          providing a voucher. If the price of the new course is:
        </li>
        <li className="pt-5 list-disc">
          Higher than the purchased course, the user has to pay the additional
          amount to Digital Marketing Institute BD by preferred payment method.
        </li>
        <li className="pt-5 list-disc">
          Lower than the purchased course, the user will get a refund of the
          additional amount from Digital Marketing Institute BD by the payment medium through
          which the course was purchased.
        </li>
        <li className="pt-5 list-disc">
          If Digital Marketing Institute BD fails to provide the resources as promised in the
          course
        </li>
        <li className="pt-5 list-disc">
          Mistakenly purchased live class instead of recorded class and
          vice-versa.
        </li>
      </div>
      <div className="w-full lg:w-5/6 mx-auto pt-10">
        <h3 className="font-bold text-xl text-gray-700">
          When you request a refund, what happens?
        </h3>
        <p className="pt-5">
          {`Once a refund request has been submitted, your enrolled course will be
          temporarily locked. Digital Marketing Institute BD shall notify you through SMS if
          the refund request has been accepted within 3 working days of
          receiving the request. After a refund request has been accepted,
          you'll be unenrolled from the course and your progress will be
          removed. If you wish to purchase the course again, you will have to
          start the course from the very beginning. (how will the user be
          notified that their request has been received? Will they receive a
          support ticket ID for them to follow up with?)`}{" "}
        </p>
        <p className="pt-5">
          {`It can take up to 7-14 working days for funds to return to your account after a requested refund. If it has been longer than 14 working days, please call 16910 (8 AM - 11 PM).`}{" "}
        </p>
        <p className="pt-5">
          {`Once the refund has been done, you will receive a confirmation email/ SMS to your registered e-mail/phone number.`}{" "}
        </p>
        <p className="pt-5">
          {`Digital Marketing Institute BD has full authority to change the T&C from time to time and case by case scenario.`}{" "}
        </p>
       
      </div>
    </div>
  );
};

export default RefundPolicyPage;
