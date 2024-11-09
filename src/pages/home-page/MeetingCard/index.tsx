import React from 'react';
import { motion } from 'framer-motion';

interface Subject {
  name: string;
  description: string;
  semester: string;
  resources: string[];
}

interface Meeting {
  id: number;
  title: string;
  description: string;
  meetLink: string;
  startTime: Date;
  endTime: Date;
}

const MeetingCard: React.FC = () => {
  const subjects: Subject[] = [
    {
      name: 'Toán học',
      description: 'Môn học về các chủ đề giải tích, đại số, và xác suất thống kê.',
      semester: 'semesterId1',
      resources: ['resourceId1', 'resourceId2'],
    },
    {
      name: 'Vật lý',
      description: 'Môn học về cơ học, điện từ học và vật lý lượng tử.',
      semester: 'semesterId2',
      resources: ['resourceId3', 'resourceId4'],
    },
    {
      name: 'Hóa học',
      description: 'Nghiên cứu về các hợp chất hóa học, phản ứng hóa học, và nguyên tử.',
      semester: 'semesterId1',
      resources: ['resourceId5', 'resourceId6'],
    },
    {
      name: 'Sinh học',
      description: 'Học về sinh học phân tử, di truyền học, và sinh thái học.',
      semester: 'semesterId3',
      resources: ['resourceId7', 'resourceId8'],
    },
  ];

  const meetings: Meeting[] = [
    {
      id: 1,
      title: 'Trung tâm Toán học',
      description: 'Phòng học cho các chủ đề Toán học nâng cao',
      meetLink: 'https://meet.google.com/math-center',
      startTime: new Date('2023-11-15T10:00:00'),
      endTime: new Date('2023-11-15T12:00:00'),
    },
    {
      id: 2,
      title: 'Phòng thí nghiệm Vật lý',
      description: 'Thảo luận và thực hành về các chủ đề Vật lý',
      meetLink: 'https://meet.google.com/physics-lab',
      startTime: new Date('2023-11-16T14:00:00'),
      endTime: new Date('2023-11-16T16:00:00'),
    },
    {
      id: 3,
      title: 'Thảo luận Hóa học',
      description: 'Phòng thảo luận về Hóa học hữu cơ và vô cơ',
      meetLink: 'https://meet.google.com/chemistry-discussion',
      startTime: new Date('2023-11-17T09:00:00'),
      endTime: new Date('2023-11-17T11:00:00'),
    },
    {
      id: 4,
      title: 'Nghiên cứu Sinh học',
      description: 'Phòng học cho sinh học phân tử và di truyền học',
      meetLink: 'https://meet.google.com/biology-research',
      startTime: new Date('2023-11-18T13:00:00'),
      endTime: new Date('2023-11-18T15:00:00'),
    },
    {
      id: 5,
      title: 'Nghiên cứu Sinh học',
      description: 'Phòng học cho sinh học phân tử và di truyền học',
      meetLink: 'https://meet.google.com/biology-research',
      startTime: new Date('2023-11-18T13:00:00'),
      endTime: new Date('2023-11-18T15:00:00'),
    },
    {
      id: 6,
      title: 'Nghiên cứu Sinh học',
      description: 'Phòng học cho sinh học phân tử và di truyền học',
      meetLink: 'https://meet.google.com/biology-research',
      startTime: new Date('2023-11-18T13:00:00'),
      endTime: new Date('2023-11-18T15:00:00'),
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        staggerChildren: 0.3,
      },
    },
  };

  return (
    <div>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="py-20 px-4 md:px-8"
      >
        <h2 className="text-4xl font-bold text-center mb-12 text-white">Phòng học trực tuyến</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto mb-12">
          {meetings.map((room, index) => {
            const subject = subjects[index];
            if (!subject) {
              return null; // Nếu subject không tồn tại, không render
            }

            return (
              <div
                key={room.id}
                className="bg-white/20 rounded-lg p-6 shadow-lg border border-white/20 backdrop-blur-md transition-transform transform hover:scale-105 hover:shadow-xl"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-semibold text-white">{subject.name}</h3>
                </div>
                <p className="text-gray-700 mb-4">{room.description}</p>
                <div className="text-sm text-gray-500 mb-4">
                  <div>Bắt đầu: {new Date(room.startTime).toLocaleString()}</div>
                  <div>Kết thúc: {new Date(room.endTime).toLocaleString()}</div>
                </div>
                <a
                  href={room.meetLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-2 text-center rounded-md transition duration-300 bg-blue-600 text-white hover:bg-blue-700"
                >
                  Tham gia phòng
                </a>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
};

export default MeetingCard;
