import React from "react";
import { X } from "lucide-react";

type OfferFormState = {
  title: string;
  discount: string;
  code: string;
  validUntil: string;
  status: "active" | "inactive";
  description: string;
};

interface OfferFormProps {
  isOpen: boolean;
  isEditing: boolean;
  formData: OfferFormState;
  onFormChange: (formData: OfferFormState) => void;
  onSubmit: () => void;
  onClose: () => void;
}

const OfferForm: React.FC<OfferFormProps> = ({
  isOpen,
  isEditing,
  formData,
  onFormChange,
  onSubmit,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl border border-gray-100 animate-in">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-2xl font-bold text-gray-900">
            {isEditing ? "Edit Offer" : "Add New Offer"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-1.5 rounded-lg transition-all"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Offer Title
            </label>
            <input
              type="text"
              placeholder="Enter offer title"
              value={formData.title}
              onChange={(e) =>
                onFormChange({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Discount (%)
            </label>
            <input
              type="number"
              placeholder="e.g., 20"
              value={formData.discount}
              onChange={(e) =>
                onFormChange({ ...formData, discount: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Promo Code
            </label>
            <input
              type="text"
              placeholder="e.g., SAVE20"
              value={formData.code}
              onChange={(e) =>
                onFormChange({
                  ...formData,
                  code: e.target.value.toUpperCase(),
                })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Valid Until
            </label>
            <input
              type="date"
              value={formData.validUntil}
              onChange={(e) =>
                onFormChange({ ...formData, validUntil: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Description
            </label>
            <textarea
              placeholder="Describe this offer..."
              value={formData.description}
              onChange={(e) =>
                onFormChange({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all h-20 resize-none"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) =>
                onFormChange({
                  ...formData,
                  status: e.target.value as "active" | "inactive",
                })
              }
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>

          <button
            onClick={onSubmit}
            className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-2.5 rounded-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all duration-300 font-semibold mt-6"
          >
            {isEditing ? "Update Offer" : "Add Offer"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferForm;
