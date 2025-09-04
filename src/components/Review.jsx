import * as React from 'react';

import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

import Autoplay from 'embla-carousel-autoplay';
import { FaStar } from 'react-icons/fa';

const reviews = [
  {
    id: 1,
    img: 'https://scontent.fjsr11-1.fna.fbcdn.net/v/t1.6435-9/75610762_442097780035387_5700345444962402304_n.jpg?_nc_cat=102&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEjfUNZExGHg4wr9faSIeyV6BA7xR320svoEDvFHfbSyxP04wtajxqZpdHi_bcKiyfvQsXSQtXUhsZ9KJmSZNg0&_nc_ohc=hGxwMLS0AZkQ7kNvwEZAwFw&_nc_oc=AdnitNhl8pXoBoyCR9YbNgtmIadq_HuZpEmB-JzOa8dOpyDiBNG-sxfdIQuP9bxxEJw&_nc_zt=23&_nc_ht=scontent.fjsr11-1.fna&_nc_gid=v7BbxS8wzhC8pm5hXtailg&oh=00_AfVLZ35cear5pj2EbTT2b7joOVnuXGUZ5qGG5T56JQ7xxw&oe=68DC83AC',
    name: 'Tanvir Rahman',
    content:
      'I really appreciate your dedication. You are focused, reliable, and handle web development tasks with great skill',
  },
  {
    id: 2,
    img: 'https://codecraftor.xyz/assets/Asif-Co00GnFP.jpg',
    name: 'Ushan Asif',
    content:
      'Abdullah Al Nirob is an excellent web developer. He built me a fast, responsive, and modern website using the latest technologies. He maintained clear communication throughout the process and delivered the work on time. I highly recommend him as a reliable and skilled developer.',
  },
  {
    id: 3,
    img: 'https://codecraftor.xyz/assets/rifat-BdclmnVk.jpg',
    name: 'Rifat Islam',
    content:
      'আপনি দারুণভাবে নিজেকে উন্নত করার চেষ্টা করেন, যা সত্যিই প্রশংসনীয়। আপনি সবসময় সবকিছু নিয়ে ইউনিক কিছু করার চেষ্টা করেন যেটা অনেক ভালো একটা লক্ষ আপনার,আশা করি এটা আপনার জীবনে ভালো কিছু নিয়ে আসবে। বিশ্বাস—আমি যতটা চিনি জানি, আমার মতে খুবই আন্তরিক একজন মানুষ আপনি বিশ্বাস করা যায় আমার মনে হয়। তবে, সবার মানসিকতা এক রকম  না—তাই এটা মানুষের উপর নির্ভরশীল আমি বিশ্বাস করি অন্য জন নাও করতে পারে। আর আপনার সার্ভিস? সত্যিই যথেষ্ট ভালো যা একটা ক্লায়েন্ট এর ভালো লাগবে আশা করা যায়,আর আপনার টাইম সিডিউল টা অনেক ভালো সবমিলিয়ে ভালো',
  },
  {
    id: 4,
    img: 'https://scontent.fjsr11-1.fna.fbcdn.net/v/t1.6435-9/52655920_684116721991176_7787362760957886464_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHGNj3tVd9YcYAVpwYAqMrkNhtzg48DDyQ2G3ODjwMPJK6w-2cmDKQAxdIvbuvMuwhnLnkT3Ve_YY2aBKVHXlNu&_nc_ohc=orB3J312Dc8Q7kNvwHEbwVN&_nc_oc=AdnU_3HPCuLrkoZXIQf1ISqnBGfehMKmcLqW6xI2jJ3A8z2UnIkvXEDbfnFUWzIKgew&_nc_zt=23&_nc_ht=scontent.fjsr11-1.fna&_nc_gid=S1-En-VrT0MtNCNRCYbxeg&oh=00_AfXK9KlYdGONLnLXKtRidimh94Oc_4z1gDW2QPNXbX39MA&oe=68DC5F19',
    name: 'RK Zahid Hassan Dipu',
    content:
      'Abdullah Al Nirob is a highly skilled Full-Stack MERN developer. He delivers clean, efficient, and well-structured code, with strong expertise in both frontend and backend development. Abdullah is proactive, detail-oriented, and a reliable team player, making him an asset to any web development project.',
  },
  {
    id: 5,
    img: 'https://codecraftor.xyz/assets/Hojrat-CpefUUDA.jpg',
    name: 'Md Hazrat Ali ',
    content:
      'আমি নিরব কে ডেভেলপার হিসেবে বড় হতে দেখেছি, এবং বলতে পারি সে সত্যিই একজন প্রতিভাবান ও পরিশ্রমী ডেভেলপার। নতুন প্রযুক্তি শেখার প্রতি তার আগ্রহ, সমস্যা সমাধানের দক্ষতা, এবং পরিষ্কার ও কার্যকর কোড লেখার অভ্যাস তাকে সবার থেকে আলাদা করে তোলে। সবসময় ইতিবাচক মনোভাব নিয়ে কাজ করে এবং নতুন চ্যালেঞ্জ নিতে কখনো পিছপা হয় না। আমি নিশ্চিত, ভবিষ্যতে সে একজন দক্ষ ও সফল সফটওয়্যার ডেভেলপার হিসেবে প্রতিষ্ঠিত হবে।',
  },
  // {
  //   id: 5,
  //   img: 'https://codecraftor.xyz/assets/Asif-Co00GnFP.jpg',
  //   name: 'Rifat',
  //   content:
  //     'আপনি দারুণভাবে নিজেকে উন্নত করার চেষ্টা করেন, যা সত্যিই প্রশংসনীয়। আপনি সবসময় সবকিছু নিয়ে ইউনিক কিছু করার চেষ্টা করেন যেটা অনেক ভালো একটা লক্ষ আপনার,আশা করি এটা আপনার জীবনে ভালো কিছু নিয়ে আসবে। বিশ্বাস—আমি যতটা চিনি জানি, আমার মতে খুবই আন্তরিক একজন মানুষ আপনি বিশ্বাস করা যায় আমার মনে হয়। তবে, সবার মানসিকতা এক রকম  না—তাই এটা মানুষের উপর নির্ভরশীল আমি বিশ্বাস করি অন্য জন নাও করতে পারে। আর আপনার সার্ভিস? সত্যিই যথেষ্ট ভালো যা একটা ক্লায়েন্ট এর ভালো লাগবে আশা করা যায়,আর আপনার টাইম সিডিউল টা অনেক ভালো সবমিলিয়ে ভালো',
  // },
  // {
  //   id: 6,
  //   img: 'https://codecraftor.xyz/assets/Asif-Co00GnFP.jpg',
  //   name: 'User 5',
  //   content: 'Review 5',
  // },
];

const Review = () => {
  const autoplay = React.useRef(
    Autoplay({ delay: 1400, stopOnInteraction: false })
  );

  // state to keep track of expanded review
  const [expanded, setExpanded] = React.useState(null);

  return (
    <div>
      <h1 className="text-4xl font-bold text-white">
        FeedBack<span className="text-blue-400">.</span>
      </h1>
      <p className='mb-6 mt-2 text-gray-400'>Building Trust Through Quality Work.</p>
      <Carousel
        plugins={[autoplay.current]}
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {reviews.map(review => {
            const isExpanded = expanded === review.id;
            const displayText = isExpanded
              ? review.content
              : review.content.length > 105
              ? review.content.slice(0, 105) + '...'
              : review.content;

            return (
              <CarouselItem
                key={review.id}
                className="basis-full md:basis-1/2 lg:basis-1/3"
              >
                <div className="p-4">
                  <Card>
                    <CardContent className="flex flex-col space-y-2 px-6 h-auto">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <FaStar key={i} className="text-yellow-500" />
                        ))}
                      </div>
                      <p className="italic text-[15px] text-gray-300">
                        {displayText}{' '}
                        {review.content.length > 110 && (
                          <span
                            className="text-blue-400 cursor-pointer hover:underline"
                            onClick={() =>
                              setExpanded(isExpanded ? null : review.id)
                            }
                          >
                            {isExpanded ? 'see less' : 'see more'}
                          </span>
                        )}
                      </p>
                      <div className="flex mt-2 gap-2 items-center">
                        <img
                          src={review.img}
                          alt={review.name}
                          className="object-cover w-8 h-8 ring-2 ring-blue-400 rounded-full"
                        />
                        <p className="text-sm">{review.name}</p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default Review;
