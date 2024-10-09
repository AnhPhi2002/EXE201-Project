import React, { useState, useEffect } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { User, Mail, Phone, Calendar, Info, Camera, Save, X, Bell, Crown } from 'lucide-react';
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea'; // Sử dụng Textarea cho trường About

// Zod schema for validation
const schema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Email must be a valid email.' }),
  phone: z.string().min(10, { message: 'Phone number must be at least 10 digits.' }),
  gender: z.enum(['male', 'female', 'other'], {
    required_error: 'Gender is required.',
  }),
  dob: z.string().nonempty({ message: 'Date of birth is required.' }),
  about: z.string().max(500, { message: 'About must be less than 500 characters.' }),
});

type FormData = z.infer<typeof schema>;

const AccountOverview = () => {
  const [profilePicture, setProfilePicture] = useState(
    'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  );
  const [isEditing, setIsEditing] = useState(false);
  const [isPremium, setIsPremium] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'New feature added to your account', read: false },
    { id: 2, message: 'Your subscription will expire soon', read: false },
    { id: 3, message: 'Security update available', read: true },
    { id: 4, message: 'Security update available', read: true },
    { id: 5, message: 'Security update available', read: true },
    { id: 6, message: 'Security update available', read: true },
  ]);

  const methods = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: 'John Doe',
      email: 'johndoe@example.com',
      phone: '',
      gender: 'male',
      dob: '',
      about: '',
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data: FormData) => {
    console.log(data);
    setIsEditing(false);
  };

  const handlePremiumRegistration = () => {
    setIsPremium(true);
    setNotifications([
      ...notifications,
      {
        id: Date.now(),
        message: "You've successfully registered for a Premium account!",
        read: false,
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <img src={profilePicture} alt="Profile" className="w-12 h-12 rounded-full mr-4" />
          <h1 className="text-3xl font-bold">
            Account Settings
            {isPremium && <Crown className="inline-block ml-2 text-yellow-500" />}
          </h1>
        </div>
        <div className="relative">
          <Bell className="text-gray-500 text-2xl cursor-pointer" />
          {notifications.filter((n) => !n.read).length > 0 && (
            <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {notifications.filter((n) => !n.read).length}
            </span>
          )}
        </div>
      </div>

      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            {/* Name Field */}
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} disabled={!isEditing} />
                  </FormControl>
                  <FormDescription>Your public display name.</FormDescription>
                  {errors.name && <FormMessage>{errors.name.message}</FormMessage>}
                </FormItem>
              )}
            />

            {/* Email Field */}
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="you@example.com" {...field} disabled={!isEditing} />
                  </FormControl>
                  <FormDescription>We'll never share your email with anyone else.</FormDescription>
                  {errors.email && <FormMessage>{errors.email.message}</FormMessage>}
                </FormItem>
              )}
            />

            {/* Phone Field */}
            <FormField
              control={control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input placeholder="1234567890" {...field} disabled={!isEditing} />
                  </FormControl>
                  <FormDescription>Your contact number.</FormDescription>
                  {errors.phone && <FormMessage>{errors.phone.message}</FormMessage>}
                </FormItem>
              )}
            />

            {/* Gender Field */}
            <FormField
              control={control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Gender</FormLabel>
                  <FormControl>
                    <select {...field} className="block w-full mt-1 border-gray-300 rounded-md" disabled={!isEditing}>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </FormControl>
                  <FormDescription>Select your gender.</FormDescription>
                  {errors.gender && <FormMessage>{errors.gender.message}</FormMessage>}
                </FormItem>
              )}
            />

            {/* Date of Birth Field */}
            <FormField
              control={control}
              name="dob"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date of Birth</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} disabled={!isEditing} />
                  </FormControl>
                  {errors.dob && <FormMessage>{errors.dob.message}</FormMessage>}
                </FormItem>
              )}
            />

            {/* About Field */}
            <FormField
              control={control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us about yourself..." {...field} disabled={!isEditing} className="w-full h-32 max-h-[500px] overflow-y-auto" />
                  </FormControl>
                  <FormDescription>A short description about you.</FormDescription>
                  {errors.about && <FormMessage>{errors.about.message}</FormMessage>}
                </FormItem>
              )}
            />

            {/* Profile Picture Field */}
            <div>
              <label htmlFor="profile-picture" className="block text-sm font-medium text-gray-700">
                Profile Picture
              </label>
              <div className="mt-1 flex items-center">
                <span className="inline-block h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                  <img src={profilePicture} alt="Profile" className="h-full w-full object-cover" />
                </span>
                <button
                  type="button"
                  className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  disabled={!isEditing}
                >
                  <Camera className="inline-block mr-2" />
                  Change
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end space-x-4 mt-6">
              <Button variant="secondary" onClick={() => setIsEditing(!isEditing)}>
                {isEditing ? (
                  <>
                    <X className="mr-2" />
                    Cancel
                  </>
                ) : (
                  'Edit'
                )}
              </Button>
              <Button type="submit" variant="default">
                {isEditing ? (
                  <>
                    <Save className="mr-2" />
                    Save Changes
                  </>
                ) : (
                  'Save'
                )}
              </Button>
            </div>
          </div>
          {/* Notifications */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Notifications</h2>

            {/* Phần container có thanh cuộn */}
            <div className="space-y-4 max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-md shadow-sm">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 rounded-lg ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}
                  onClick={() => setNotifications(notifications.map((n) => (n.id === notification.id ? { ...n, read: true } : n)))}
                >
                  <p className={`${notification.read ? 'text-gray-600' : 'text-blue-800'}`}>{notification.message}</p>
                  {!notification.read && <span className="text-xs text-blue-600 mt-1 block">Click to mark as read</span>}
                </div>
              ))}
            </div>
          </div>

          {/* Premium Registration */}
          {!isPremium && (
            <div className="mt-6">
              <Button onClick={handlePremiumRegistration} variant="default" className="w-full bg-yellow-600 text-white py-2">
                <Crown className="mr-2" />
                Register for Premium Account
              </Button>
            </div>
          )}
        </form>
      </FormProvider>
    </div>
  );
};

export default AccountOverview;
