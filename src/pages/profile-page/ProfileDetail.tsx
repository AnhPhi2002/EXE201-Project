import React, { useEffect, useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, Crown } from 'lucide-react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

const schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Email must be a valid email.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required.',
  }),
  dob: z.string().nonempty({ message: 'Date of birth is required.' }),
  about: z.string().max(500, { message: 'About must be less than 500 characters.' }),
  avatar: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface UserProfile {
  _id: string;
  name: string;
  email: string;
  role: string;
  phone?: string;
  gender?: 'male' | 'female' | 'other';
  dob?: string;
  about?: string;
  avatar?: string;
}

const ProfileDetail: React.FC = () => {
  const [profilePicture, setProfilePicture] = useState('');
  const [userId, setUserId] = useState<string | null>(null);
  const [role, setRole] = useState<string>(''); // Trạng thái để lưu vai trò của người dùng
  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      gender: 'male',
      dob: '2000-01-01',
      about: '',
      avatar: '',
    },
  });
  const { handleSubmit, control, setValue, formState: { errors } } = methods;

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('https://learnup.work/api/auth/user-info', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user info");
        }

        const data: UserProfile = await response.json();

        setUserId(data._id);
        setRole(data.role); // Lưu vai trò người dùng
        setValue('name', data.name);
        setValue('email', data.email);
        setValue('phone', data.phone || '');
        setValue('gender', data.gender || 'male');
        setValue('dob', data.dob || '2000-01-01');
        setValue('about', data.about || '');
        setProfilePicture(data.avatar || '');
        setValue('avatar', data.avatar || '');
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };
    fetchUserInfo();
  }, [setValue]);

  const openCloudinaryWidget = () => {
    if ((window as any).cloudinary) {
      (window as any).cloudinary.openUploadWidget(
        {
          cloudName: "dbezyvjzm",
          uploadPreset: "learnup",
          sources: ["local", "camera"],
          cropping: true,
          multiple: false,
          defaultSource: "local",
        },
        (error: any, result: any) => {
          if (!error && result && result.event === "success") {
            const uploadedUrl = result.info.secure_url;
            setProfilePicture(uploadedUrl);
            setValue('avatar', uploadedUrl);
          }
        }
      );
    } else {
      console.error("Cloudinary Widget script not loaded.");
    }
  };

  const onSubmit = async (data: FormData) => {
    const token = localStorage.getItem('token');

    if (!userId) {
      alert("User ID not found.");
      return;
    }

    try {
      const response = await fetch(`https://learnup.work/api/auth/update/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Server error:", errorData);
        alert(`Update failed: ${errorData.message || 'Unknown error'}`);
        return;
      }

      alert("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-100 to-pink-100 flex items-center justify-center p-18" style={{padding: '100px 0'}}>
      <div className="max-w-7xl w-full p-8 bg-white rounded-lg shadow-lg mt-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center">
            <Avatar className="w-20 h-20 mr-4 border-4 border-indigo-500 shadow-lg">
              <AvatarImage src={profilePicture || "https://example.com/default-avatar.jpg"} alt="Profile" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
              Account Settings
              {role === 'member_premium' && (
                <Crown className="ml-2 text-yellow-500 w-6 h-6" aria-label="Premium Member" />
              )}
            </h1>
          </div>
          <Button
            onClick={openCloudinaryWidget}
            className="px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg shadow-md hover:bg-indigo-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300 ease-in-out transform hover:scale-105"
          >
            Change Profile Picture
          </Button>
        </div>

        <FormProvider {...methods}>
          <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <FormField
                control={control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Your name" />
                    </FormControl>
                    {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="you@example.com" />
                  </FormControl>
                  {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="1234567890" />
                  </FormControl>
                  {errors.phone && <FormMessage>{errors.phone.message}</FormMessage>}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <select
                      {...field}
                      className="block w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </FormControl>
                  {errors.gender && <FormMessage>{errors.gender.message}</FormMessage>}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input
                      type="date"
                      {...field}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  {errors.dob && <FormMessage>{errors.dob.message}</FormMessage>}
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="about"
              render={({ field }) => (
                <FormItem className="col-span-2">
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Tell us about yourself..."
                      className="w-full h-32 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
                    />
                  </FormControl>
                  {errors.about && <FormMessage>{errors.about.message}</FormMessage>}
                </FormItem>
              )}
            />

            <div className="col-span-2 flex justify-end space-x-4 mt-6">
              <Button type="submit" variant="default" className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors">
                <Save className="mr-2 w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </FormProvider>
      </div>
    </div>
  );
};

export default ProfileDetail;
