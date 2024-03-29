
import Image from 'next/image';



const MemberCard = ({ name, role, imageUrl, socialMedia }) => {
    return (
      <div className="bg-purple-100 p-4 rounded-lg shadow-lg text-center">
        <Image
          src={imageUrl}
          alt={name}
          width={100}
          height={100}
          className="rounded-full mx-auto"
        />
        <h3 className="text-purple-900 text-lg font-bold mt-2">{name}</h3>
        <p className="text-purple-700">{role}</p>
        <div className="flex justify-center mt-2">
          {socialMedia.map(({ icon, url }) => (
            <a href={url} key={icon} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-800 mx-2">
              <i className={`fab ${icon}`}></i>
            </a>
          ))}
        </div>
      </div>
    );
  };

  export default MemberCard