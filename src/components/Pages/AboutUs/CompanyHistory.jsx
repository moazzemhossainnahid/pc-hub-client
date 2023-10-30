import AboutUsSectionText from "./UI/AboutUsSectionText";
import AboutUsSectionTitle from "./UI/AboutUsSectionTitle";

const CompanyHistory = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 my-20 max-width">
      {/* ------------ Our history heading ------------ */}

      <div>
        <AboutUsSectionTitle text={"About Our History"} />
        <div className="   border border-b-4 border-secondary mt-4 w-5/6"></div>
      </div>

      {/* ------------ Our history text ------------ */}

      <AboutUsSectionText
        text={
          "If you would like to study in the university in the heart of the city that focus on chaning the world for better to morrow, you’re choosin the right place. We do not use special formulas to select students. We look at every single applicant’s application, academic and personal, to select students who suit to our community with a full range of backgrounds. If you would like to study"
        }
      />
      <AboutUsSectionText
        text={
          "If you would like to study in the university in the heart of the city that focus on chaning the world for better to morrow, you’re choosin the right place. We do not use special formulas to select students. We look at every single applicantt’s application, academic and personal, to select students who suit to our community."
        }
      />
    </div>
  );
};

export default CompanyHistory;
