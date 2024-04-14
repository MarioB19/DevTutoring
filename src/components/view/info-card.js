import Image from 'next/image';


const InfoCard = ({ title, image, description }) => {
    return (
      <div className="flex flex-col max-w-sm rounded overflow-hidden shadow-lg h-full">
        <div className="flex-shrink-0">
            
          <Image
            src={image}
            alt={title}
            width={400}
            height={250}
            layout="responsive"
          />
        </div>
        <div className="flex-grow p-6 flex flex-col">
          <h2 className="text-black font-bold text-xl mb-2">{title}</h2>
          <p className="text-gray-700 text-base flex-grow">
            {description}
          </p>
        </div>
      </div>
    );
  };
  
  export default InfoCard;
  

  