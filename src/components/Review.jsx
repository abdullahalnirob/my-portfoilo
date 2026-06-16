import * as React from 'react';
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
    img: 'https://i.ibb.co.com/27kBXNXr/tanvir.jpg',
    name: 'Tanvir Rahman',
    content:
      'I really appreciate your dedication. You are focused, reliable, and handle web development tasks with great skill. Abdullah is an excellent developer who delivers quality work on time.',
    rating: 5,
  },
  {
    id: 2,
    img: 'https://codecraftor.dev/assets/Asif-Co00GnFP.jpg',
    name: 'Ushan Asif',
    content:
      'Abdullah Al Nirob is an excellent web developer. He built me a fast, responsive, and modern website using the latest technologies. He maintained clear communication throughout the process and delivered the work on time. I highly recommend him as a reliable and skilled developer.',
    rating: 5,
  },
  {
    id: 3,
    img: 'https://scontent.fjsr11-1.fna.fbcdn.net/v/t39.30808-6/572367877_1548420006289218_6155582355087411473_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeFu9OX8s1n7E9n9Zdk-kWjhICfkeydDGrkgJ-R7J0MauT0SlYjHPjYZ51APB1wFycjyDC1y1jxXA8rlwO_eXDX3&_nc_ohc=hL5DAq6x_H8Q7kNvwE2ecW8&_nc_oc=AdnsLm77GXgE1WD0DdxZfjkUQ0U4hOcZ1Xq_jXC8N8JS61fdtiAuZvlhsdsQnCqpDec&_nc_zt=23&_nc_ht=scontent.fjsr11-1.fna&_nc_gid=N1oKa5j7ijx12IO4FqoYGg&oh=00_Afi3mIAFxKFU4JN15l_UAKRR-3KpkghI9vySVaNrUp8EpQ&oe=692FA261',
    name: 'Rifat Islam',
    content:
      'আপনি দারুণভাবে নিজেকে উন্নত করার চেষ্টা করেন, যা সত্যিই প্রশংসনীয়। আপনার সার্ভিস সত্যিই যথেষ্ট ভালো এবং আপনার টাইম সিডিউল অনেক ভালো। সবমিলিয়ে আপনি একজন বিশ্বস্ত এবং দক্ষ ডেভেলপার।',
    rating: 5,
  },
  {
    id: 4,
    img: 'https://scontent.fjsr11-1.fna.fbcdn.net/v/t1.6435-9/52655920_684116721991176_7787362760957886464_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeHGNj3tVd9YcYAVpwYAqMrkNhtzg48DDyQ2G3ODjwMPJK6w-2cmDKQAxdIvbuvMuwhnLnkT3Ve_YY2aBKVHXlNu&_nc_ohc=Soo1TtljssYQ7kNvwH9GPtY&_nc_oc=Adl4y-XzGgmCPyz-txIOQJIiQTKmAjmvDsxBWBz5lhaHmyFn86mqAFAHUqkbnJxkUTE&_nc_zt=23&_nc_ht=scontent.fjsr11-1.fna&_nc_gid=NVrY-LAE_y_FD2hyWpFYfA&oh=00_AfiPbzWkfsT9c61B13gP5q40n3YdzEk5yz_PbzzBIk1OUw&oe=69514419',
    name: 'RK Zahid Hassan Dipu',
    content:
      'Abdullah Al Nirob is a highly skilled full-stack software developer. He delivers clean, efficient, and well-structured code, with strong expertise in both frontend and backend development. Abdullah is proactive, detail-oriented, and a reliable team player.',
    rating: 5,
  },
  {
    id: 5,
    img: 'https://i.ibb.co.com/FLjJxwwy/Hazrat.jpg',
    name: 'Md Hazrat Ali',
    content:
      'আমি নিরব কে ডেভেলপার হিসেবে বড় হতে দেখেছি, এবং বলতে পারি সে সত্যিই একজন প্রতিভাবান ও পরিশ্রমী ডেভেলপার। নতুন প্রযুক্তি শেখার প্রতি তার আগ্রহ এবং সমস্যা সমাধানের দক্ষতা তাকে অনন্য করে তোলে।',
    rating: 5,
  },
];

const ReviewCard = ({ review, isExpanded, onToggleExpand }) => {
  const displayText = isExpanded
    ? review.content
    : review.content.length > 120
    ? review.content.slice(0, 120) + '...'
    : review.content;

  return (
    <div className="p-4 md:p-6">
      <div className="rounded-xl border border-gray-700/50 hover:border-blue-400/50 transition-all duration-300 bg-gradient-to-br from-gray-800/30 to-gray-900/30 p-6 md:p-8 h-full flex flex-col hover:shadow-lg hover:shadow-blue-500/10 hover:-translate-y-1">
        {/* Stars */}
        <div className="flex items-center gap-1 mb-4">
          {[...Array(review.rating)].map((_, i) => (
            <FaStar key={i} className="w-4 h-4 text-yellow-400" />
          ))}
        </div>

        {/* Review Text */}
        <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-6 flex-1 italic">
          "{displayText}"
          {review.content.length > 120 && (
            <button
              onClick={() => onToggleExpand(review.id)}
              className="block text-blue-400 hover:text-blue-300 font-semibold mt-3 transition-colors duration-200"
            >
              {isExpanded ? '← See Less' : 'See More →'}
            </button>
          )}
        </p>

        {/* Author */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-700/50">
          <img
            src={review.img || '/placeholder.svg'}
            alt={review.name}
            className="w-10 h-10 md:w-12 md:h-12 object-cover rounded-full ring-2 ring-blue-400/50"
          />
          <div>
            <p className="text-sm md:text-base font-semibold text-white">
              {review.name}
            </p>
            <p className="text-xs md:text-sm text-gray-400">Verified Client</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const Review = () => {
  const autoplay = React.useRef(
    Autoplay({ delay: 4000, stopOnInteraction: false })
  );

  const [expanded, setExpanded] = React.useState(null);

  return (
    <section id="testimonials" className="py-16 md:py-24">
      <div className="max-w-6xl mx-auto px-6">
        {/* Header */}
        <div className="mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-3">
            Feedback<span className="text-blue-400">.</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mb-6"></div>
          <p className="text-gray-400 text-base md:text-lg">
            Building Trust Through Quality Work and Client Satisfaction.
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          plugins={[autoplay.current]}
          opts={{
            align: 'start',
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-4 md:-ml-6">
            {reviews.map((review) => (
              <CarouselItem
                key={review.id}
                className="pl-4 md:pl-6 basis-full md:basis-1/2 lg:basis-1/3"
              >
                <ReviewCard
                  review={review}
                  isExpanded={expanded === review.id}
                  onToggleExpand={setExpanded}
                />
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Navigation Buttons */}
          <div className="flex justify-end gap-2 mt-8">
            <CarouselPrevious className="relative static w-12 h-12 rounded-lg border border-gray-700 hover:border-blue-400/50 hover:bg-blue-500/10 transition-all" />
            <CarouselNext className="relative static w-12 h-12 rounded-lg border border-gray-700 hover:border-blue-400/50 hover:bg-blue-500/10 transition-all" />
          </div>
        </Carousel>
      </div>

      <div id="contact"></div>
    </section>
  );
};

export default Review;