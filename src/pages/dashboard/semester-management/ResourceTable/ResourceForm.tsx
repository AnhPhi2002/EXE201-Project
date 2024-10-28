// import React, { useState } from "react";
// import { Resource } from "../TabComponent";
// import Modal from "./Modal";


// interface ResourceFormProps {
//   resource?: Resource;
//   onSave: (resourceData: Resource) => void;
//   onClose: () => void;
// }

// const ResourceForm: React.FC<ResourceFormProps> = ({ resource, onSave, onClose }) => {
//   const [title, setTitle] = useState(resource ? resource.title : "");
//   const [description, setDescription] = useState(resource ? resource.description : "");
//   const [type, setType] = useState(resource ? resource.type : "pdf");

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     const newResource: Resource = {
//       id: resource ? resource.id : String(Date.now()),
//       title,
//       description,
//       fileUrls: [],
//       type,
//       subject: resource ? resource.subject : "",
//       allowedRoles: ["member_free"],
//     };
//     onSave(newResource);
//     onClose();
//   };

//   return (
//     <Modal title={resource ? "Update Resource" : "Create Resource"} onClose={onClose}>
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Title</label>
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Description</label>
//           <input
//             type="text"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="mt-1 p-2 border border-gray-300 rounded-md w-full"
//             required
//           />
//         </div>
//         <div>
//           <label className="block text-sm font-medium text-gray-700">Type</label>
      
//         </div>
//         <div className="flex justify-end space-x-4">
//           <button type="button" className="bg-gray-300 px-4 py-2 rounded-md" onClick={onClose}>
//             Cancel
//           </button>
//           <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
//             {resource ? "Update" : "Create"}
//           </button>
//         </div>
//       </form>
//     </Modal>
//   );
// };

// export default ResourceForm;
