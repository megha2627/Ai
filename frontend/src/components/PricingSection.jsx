import React from "react";
import Footer from "./Footer";

const PricingSection = () => {
  return (
    <div className="min-h-screen text-white">
      <div className="max-w-7xl mx-auto py-24 px-6 mt-10">
        <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-indigo-400 text-center mb-12 drop-shadow-[0_0_25px_rgba(129,140,248,0.6)]">
          Choose Your Plan
        </h2>

        <p className="text-lg md:text-xl text-gray-300 mb-16 text-center max-w-3xl mx-auto leading-relaxed">
          Select the perfect plan for your business needs and unlock the power
          of AI with{" "}
          <span className="text-purple-300 font-semibold">EntropyAI</span>.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            {
              name: "Starter",
              price: "₹999",
              subtitle: "per month",
              button: "Get Started",
              features: [
                "1 AI Chatbot",
                "500 Conversations/month",
                "Basic Website Integration",
                "Email Support",
                "Standard Templates",
              ],
              popular: false,
            },
            {
              name: "Professional",
              price: "₹2999",
              subtitle: "per month",
              button: "Choose Plan",
              features: [
                "5 AI Chatbots",
                "Unlimited Conversations",
                "Advanced Website Builder",
                "Priority Support",
                "Custom Branding",
                "Analytics Dashboard",
              ],
              popular: true,
            },
            {
              name: "Enterprise",
              price: "₹9999",
              subtitle: "per month",
              button: "Contact Sales",
              features: [
                "Unlimited Chatbots",
                "Unlimited Everything",
                "White-label Solution",
                "24/7 Support",
                "Custom AI Training",
                "Advanced Security",
              ],
              popular: false,
            },
          ].map((plan, i) => (
            <div
              key={i}
              className={`relative rounded-2xl p-8 transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-2 backdrop-blur-lg border border-white/10 ${
                plan.popular
                  ? "z-10 -translate-y-4 bg-gradient-to-br from-purple-900/40 to-blue-900/40 shadow-[0_0_40px_rgba(139,92,246,0.4)]"
                  : "bg-white/5 hover:shadow-[0_0_30px_rgba(96,165,250,0.3)]"
              }`}
            >
              {plan.popular && (
                <span className="absolute top-0 right-0 bg-yellow-400 text-gray-900 text-xs font-semibold px-4 py-1 rounded-br-xl rounded-tl-xl shadow-md">
                  Most Popular
                </span>
              )}

              <h3 className="text-2xl font-bold text-blue-300 mb-3 tracking-wide">
                {plan.name}
              </h3>
              <p className="text-4xl font-extrabold text-white mb-1">
                {plan.price}
              </p>
              <p className="text-sm text-gray-400 mb-6">{plan.subtitle}</p>

              <ul className="space-y-3 text-sm text-blue-100 mb-10">
                {plan.features.map((f, index) => (
                  <li key={index} className="flex items-center">
                    <span className="text-green-400 mr-2 text-lg">✔️</span> {f}
                  </li>
                ))}
              </ul>

              <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
                {plan.button}
              </button>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default PricingSection;
