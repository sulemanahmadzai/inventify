import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { toast } from "../../hooks/use-toast";
import { profileService } from "@/services/profileService";
import { Toaster } from "../ui/toaster";
const BasicInfoForm = ({ profile, onUpdate }) => {
  const [formData, setFormData] = useState({
    name: profile.name || "",
    phoneNumber: profile.personalDetails?.phoneNumber || "",
    country: profile.personalDetails?.country || "",
    city: profile.personalDetails?.city || "",
    state: profile.personalDetails?.state || "",
    postalCode: profile.personalDetails?.postalCode || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const a = await profileService.updateProfile(formData);
      console.log(a);
      toast({
        title: "Profile Updated",
        description: "Your profile information has been successfully updated.",
      });
      onUpdate();
    } catch (error) {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="phoneNumber">Phone Number</Label>
        <Input
          id="phoneNumber"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="country">Country</Label>
        <Input
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="city">City</Label>
        <Input
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="state">State</Label>
        <Input
          id="state"
          name="state"
          value={formData.state}
          onChange={handleChange}
        />
      </div>
      <div>
        <Label htmlFor="postalCode">Postal Code</Label>
        <Input
          id="postalCode"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
        />
      </div>
      <Button type="submit">Update Profile</Button>
      <Toaster />
    </form>
  );
};

export default BasicInfoForm;
