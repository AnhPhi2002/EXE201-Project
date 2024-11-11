import React, { useEffect } from "react";

import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface Statistic {
  label: string;
  value: string;
}

interface Testimonial {
  name: string;
  role: string;
  quote: string;
  image: string;
}

const AboutUs: React.FC = () => {

  useEffect(() => {
    document.title = "Giới thiệu | LearnUp"
  }, [])
  const teamMembers: TeamMember[] = [
    {
      name: "Nguyễn Hoàng Anh Phi",
      role: "Người sáng lập & CEO",
      bio: "Đam mê về việc phổ cập giáo dục thông qua công nghệ.",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Nguyễn Phương Hoàng",
      role: "Giám đốc Công nghệ",
      bio: "Người yêu công nghệ, tận tâm xây dựng nền tảng học tập quy mô lớn.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Trần Hoàng Mỹ",
      role: "Trưởng bộ phận Nội dung",
      bio: "Chuyên gia trong việc tạo nội dung giáo dục hấp dẫn cho người học đa dạng.",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80"
    }
  ];

  const statistics: Statistic[] = [
    { label: "Thành viên Tích cực", value: "50,000+" },
    { label: "Tài nguyên Miễn phí", value: "1,000+" },
    { label: "Câu hỏi Đã Trả lời", value: "100,000+" },
    { label: "Câu chuyện Thành công", value: "5,000+" }
  ];

  const testimonials: Testimonial[] = [
    {
      name: "Hồng Hạnh",
      role: "Thành viên",
      quote: "LearnUp đã thay đổi hành trình học tập của tôi với nguồn tài nguyên phong phú và cộng đồng hỗ trợ.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Quang Huy",
      role: "Thành viên",
      quote: "Tính linh hoạt của nền tảng cho phép tôi nâng cao kỹ năng trong khi vẫn duy trì công việc toàn thời gian.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    },
    {
      name: "Mỹ Phụng",  
      role: "Thành viên VIP",
      quote: "Tính linh hoạt của nền tảng cho phép tôi nâng cao kỹ năng trong khi vẫn duy trì công việc toàn thời gian.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 py-24">
        <div className="container mx-auto px-[10%]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">Về LearnUp</h1>
            <p className="text-xl text-white/90 max-w-2xl mx-auto">
              Trao quyền cho người học trên toàn thế giới thông qua giáo dục dễ tiếp cận và chia sẻ kiến thức dựa trên cộng đồng.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Mission Section */}
      <section className="py-20">
        <div className=" mx-auto px-[10%]">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-white mb-6">Sứ mệnh của Chúng tôi</h2>
              <p className="text-gray-100 leading-relaxed mb-6">
                LearnUp cam kết phá bỏ rào cản trong giáo dục bằng cách cung cấp một nền tảng nơi kiến thức được chia sẻ tự do và việc học tập có thể tiếp cận với tất cả mọi người.
              </p>
              <p className="text-gray-100 leading-relaxed">
                Chúng tôi tin tưởng vào sức mạnh của học tập dựa trên cộng đồng và hướng đến việc tạo ra một môi trường nơi người học có thể cùng nhau phát triển.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative h-[400px]"
            >
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80"
                alt="Cộng đồng Học tập"
                className="rounded-lg shadow-xl w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 py-20">
        <div className="">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {statistics.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <h3 className="text-4xl font-bold text-pink-600 mb-2">{stat.value}</h3>
                <p className="text-white">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className=" px-[10%]">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Đội ngũ của chúng tôi</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 mx-auto rounded-full mb-4 object-cover shadow-lg"
                />
                <h3 className="text-xl font-semibold text-white">{member.name}</h3>
                <p className="text-pink-600">{member.role}</p>
                <p className="text-gray-100 mt-2">{member.bio}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-blue-500/20 py-20">
        <div className=" mx-auto px-[10%]">
          <h2 className="text-3xl font-bold text-center text-white mb-12">Ý kiến từ học viên của chúng tôi</h2>
          <div className="grid md:grid-cols-3 gap-12">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/30 shadow-lg rounded-lg p-6 text-center backdrop-blur-md"
              >
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 mx-auto rounded-full mb-4 object-cover shadow-lg"
                />
                <h3 className="text-xl font-semibold text-white">{testimonial.name}</h3>
                <p className="text-pink-600">{testimonial.role}</p>
                <p className="text-gray-100 mt-4 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutUs;