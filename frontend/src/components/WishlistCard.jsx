import { Link } from "react-router-dom";
import { CalendarIcon, UsersIcon } from "@heroicons/react/outline";
import { wishlistApi } from "../api/api";
const WishlistCard = ({ wishlist, id }) => {
  const { title, createdAt, collaborators = [], productCount = 0 } = wishlist;
  console.log(id);

  // Format date
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <Link
      to={`/wishlist/${id}`}
      className="block p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-50 transition-colors"
    >
      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
        {title}
      </h5>

      <div className="flex items-center text-sm text-gray-500 mt-4">
        <div className="flex items-center mr-4">
          <CalendarIcon className="h-4 w-4 mr-1" />
          <span>{formattedDate}</span>
        </div>

        <div className="flex items-center">
          <UsersIcon className="h-4 w-4 mr-1" />
          <span>{collaborators.length} collaborators</span>
        </div>
      </div>

      <div className="mt-4 text-sm font-medium text-gray-700">
        {productCount} {productCount === 1 ? "item" : "items"}
      </div>
    </Link>
  );
};

export default WishlistCard;
