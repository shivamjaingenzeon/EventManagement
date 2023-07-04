import React from "react";
import Navbar from "./NavBar";

const AboutUs = () => {
  const generateCreators = () => {
    const fruits = new Map([
      [
        "Shivam Jain",
        "https://dummyimage.com/200x200/000000/ffffff&text=Creator",
      ],
      [
        "Rushikesh Pise",
        "https://dummyimage.com/200x200/000000/ffffff&text=Creator",
      ],
      [
        "Ankit Sengar",
        "https://dummyimage.com/200x200/000000/ffffff&text=Creator",
      ],
      [
        "Izharul Ansari",
        "https://dummyimage.com/200x200/000000/ffffff&text=Creator",
      ],
      [
        "Yashika Tanwar",
        "https://dummyimage.com/200x200/000000/ffffff&text=Creator",
      ],
      [
        "Vivek Kumar",
        "https://dummyimage.com/200x200/000000/ffffff&text=Creator",
      ],
      [
        "Shubham Dhawdekar",
        "https://dummyimage.com/200x200/000000/ffffff&text=Creator",
      ],
      [
        "Kshitiz Lal",
        "https://dummyimage.com/200x200/000000/ffffff&text=Creator",
      ],
      [
        "Damini Sapate",
        "https://dummyimage.com/200x200/000000/ffffff&text=Creator",
      ],
      [
        "Shreyakanksha Gupta",
        "https://dummyimage.com/200x200/000000/ffffff&text=Creator",
      ],
    ]);
    var i = 1;
    const creators = [];
    fruits.forEach((values, keys) => {
      const creator = {
        id: i++,
        name: keys,
        image: values,
      };
      creators.push(creator);
    });
    return creators;
  };

  const creators = generateCreators();

  return (
    <div>
      <Navbar />
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Our Creators</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {creators.map((creator) => (
              <div
                key={creator.id}
                className="bg-white rounded-lg shadow-md p-4 text-center"
              >
                <img
                  src={creator.image}
                  alt={creator.name}
                  className="rounded-full h-24 w-24 mx-auto mb-4"
                />
                <p className="text-lg font-medium">{creator.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
