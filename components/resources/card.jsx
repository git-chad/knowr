import Image from "next/image";
import Link from "next/link";
import React from "react";

const Card = ({ resource }) => {
  return (
    <Link href={`/resources/${resource.slug}`}>
      <Image
        src={resource.image}
        width={1000}
        height={0}
        className="h-64 object-cover rounded-t-xl rounded-br-xl"
      />
      <div className="mt-2 flex justify-between">
        <p className="font-semibold text-xl">{resource.title}</p>
        <div className="space-x-1">
          {resource.tags.map((tag, index) => (
            <span
              key={index}
              className="text-xs border ring-1 ring-neutral-500 rounded px-2"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <p className="mt-2 text-sm">{resource.description}</p>
    </Link>
  );
};

export default Card;
