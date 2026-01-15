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
    <div className="w-full bg-gradient-to-b from-white to-gray-50 flex flex-col justify-center items-center p-[10vw]">
      {/* Header */}
      <div className="text-center mb-16">
        <h4 className="text-orange-500 text-lg font-bold tracking-widest uppercase mb-2">
          Our Promise
        </h4>
        <h1 className="text-5xl md:text-6xl font-black text-gray-900 mb-4">
          Your Favorite Food
        </h1>
        <h1 className="text-5xl md:text-6xl font-black bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
          Delivery Partner
        </h1>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
        {cardData.map((card, index) => (
          <div
            key={index}
            className={`group bg-gradient-to-br ${card.color} p-1 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 hover:-translate-y-3 overflow-hidden`}
          >
            {/* Card Content */}
            <div className="rounded-2xl bg-white w-full flex flex-col cursor-default h-full group-hover:bg-opacity-95 transition-all">
              {/* Image */}
              <div className="relative overflow-hidden rounded-t-xl h-64">
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                {/* Icon Badge */}
                <div
                  className={`absolute top-4 right-4 bg-gradient-to-br ${card.color} text-white text-3xl w-16 h-16 rounded-full flex items-center justify-center shadow-lg`}
                >
                  {card.icon}
                </div>
              </div>

              {/* Text Content */}
              <div className="p-6 flex flex-col flex-grow">
                <h2
                  className={`text-2xl font-black bg-gradient-to-r ${card.color} bg-clip-text text-transparent mb-3 group-hover:scale-105 transition-transform origin-left`}
                >
                  {card.title}
                </h2>
                <p className="text-gray-600 text-base leading-relaxed flex-grow group-hover:text-gray-800 transition-colors">
                  {card.description}
                </p>

                {/* Bottom accent */}
                <div
                  className={`h-1 bg-gradient-to-r ${card.color} w-0 group-hover:w-12 transition-all duration-300 mt-6`}
                ></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cards;
