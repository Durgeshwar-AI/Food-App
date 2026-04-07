import React from "react";

const cardData = [
  {
    img: "https://images.unsplash.com/opengraph/1x1.png?mark=https%3A%2F%2Fimages.unsplash.com%2Fopengraph%2Flogo.png&mark-w=64&mark-align=top%2Cleft&mark-pad=50&h=630&w=1200&blend=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1615752865424-62638daceeae%3Fcrop%3Dfaces%252Cedges%26h%3D630%26w%3D1200%26blend%3D000000%26blend-mode%3Dnormal%26blend-alpha%3D10%26mark-w%3D750%26mark-align%3Dmiddle%252Ccenter%26mark%3Dhttps%253A%252F%252Fimages.unsplash.com%252Fopengraph%252Fsearch-input.png%253Fw%253D750%2526h%253D84%2526txt%253Deasy%2526txt-pad%253D80%2526txt-align%253Dmiddle%25252Cleft%2526txt-color%253D%252523000000%2526txt-size%253D40%2526txt-width%253D660%2526txt-clip%253Dellipsis%2526auto%253Dformat%2526fit%253Dcrop%2526q%253D60%26auto%3Dformat%26fit%3Dcrop%26q%3D60%26ixid%3DM3wxMjA3fDB8MXxzZWFyY2h8Mnx8ZWFzeXxlbnwwfHx8fDE3NTUyMzgzNTR8MA%26ixlib%3Drb-4.1.0&blend-w=1&auto=format&fit=crop&q=60",
    title: "Easy To Order",
    description:
      "Order your favorite meals effortlessly with our simple and user-friendly process. Just a few taps and your food is on the way.",
    icon: "🎯",
    color: "from-blue-500 to-blue-600",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1681488134408-d6eb570673af?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTN8fGZhc3QlMjBkZWxpdmVyeXxlbnwwfHwwfHx8MA%3D%3D",
    title: "Fastest Delivery",
    description:
      "We value your time. Our delivery partners make sure your order reaches you fresh and hot, right on time.",
    icon: "⚡",
    color: "from-orange-500 to-orange-600",
  },
  {
    img: "https://plus.unsplash.com/premium_photo-1738894549244-cb88c55f7784?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8QmVzdCUyMHF1YWxpdHl8ZW58MHx8MHx8fDA%3D",
    title: "Best Quality",
    description:
      "We handpick the best restaurants and ingredients to guarantee top quality food with every order.",
    icon: "👑",
    color: "from-red-500 to-red-600",
  },
];

const Cards = () => {
  return (
    <div className="w-full bg-[#fafafa] flex flex-col justify-center items-center py-24 px-[5vw] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-[100px] pointer-events-none"></div>

      {/* Header */}
      <div className="text-center mb-16 relative z-10">
        <h4 className="text-orange-500 text-sm font-semibold tracking-[0.2em] uppercase mb-4 animate-fade-in inline-block py-1 px-3 rounded-full bg-orange-500/10 border border-orange-500/20">
          Our Promise
        </h4>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-gray-900 mb-2 leading-tight">
          Your Favorite Food
        </h1>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent leading-tight flex items-center justify-center gap-2">
          Delivery Partner Backup
        </h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-7xl relative z-10">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`group p-px rounded-3xl bg-gradient-to-br ${card.color} hover:shadow-[0_20px_40px_rgba(249,115,22,0.1)] transition-all duration-500 transform hover:-translate-y-2`}
          >
            {/* Card Content */}
            <div className="rounded-[23px] bg-white/95 backdrop-blur-xl w-full flex flex-col cursor-default h-full overflow-hidden">
              {/* Image */}
              <div className="relative overflow-hidden h-56 w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10"></div>
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover opacity-90 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700"
                />
                {/* Icon Badge */}
                <div
                  className={`absolute top-4 right-4 bg-gradient-to-br ${card.color} text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg z-20 text-xl border border-white/20 backdrop-blur-md`}
                >
                  {card.icon}
                </div>
              </div>

              {/* Text Content */}
              <div className="p-8 flex flex-col flex-grow relative">
                {/* Decorative glowing orb behind text */}
                <div className={`absolute top-0 right-0 w-24 h-24 bg-gradient-to-br ${card.color} opacity-5 blur-2xl rounded-full group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                <h2
                  className="text-2xl font-bold text-gray-900 mb-3 tracking-wide"
                >
                  {card.title}
                </h2>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow font-light">
                  {card.description}
                </p>

                {/* Bottom accent */}
                <div className="flex items-center gap-2 mt-6 group-hover:pl-2 transition-all duration-300">
                  <span className={`text-sm font-semibold text-transparent bg-clip-text bg-gradient-to-r ${card.color}`}>Learn More</span>
                  <span className={`text-transparent bg-clip-text bg-gradient-to-r ${card.color}`}>→</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
