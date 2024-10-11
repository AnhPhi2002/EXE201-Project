// const [notifications, setNotifications] = useState([
//   { id: 1, message: 'New feature added to your account', read: false },
//   { id: 2, message: 'Your subscription will expire soon', read: false },
//   { id: 3, message: 'Security update available', read: true },
//   { id: 4, message: 'Security update available', read: true },
//   { id: 5, message: 'Security update available', read: true },
//   { id: 6, message: 'Security update available', read: true },
// ]);

//   {/* Notifications */}
//   <div>
//   <h2 className="text-xl font-semibold mb-4">Notifications</h2>

//   {/* Phần container có thanh cuộn */}
//   <div className="space-y-4 max-h-96 overflow-y-auto p-4 bg-gray-50 rounded-md shadow-sm">
//     {notifications.map((notification) => (
//       <div
//         key={notification.id}
//         className={`p-4 rounded-lg ${notification.read ? 'bg-gray-100' : 'bg-blue-100'}`}
//         onClick={() => setNotifications(notifications.map((n) => (n.id === notification.id ? { ...n, read: true } : n)))}
//       >
//         <p className={`${notification.read ? 'text-gray-600' : 'text-blue-800'}`}>{notification.message}</p>
//         {!notification.read && <span className="text-xs text-blue-600 mt-1 block">Click to mark as read</span>}
//       </div>
//     ))}
//   </div>
// </div>
