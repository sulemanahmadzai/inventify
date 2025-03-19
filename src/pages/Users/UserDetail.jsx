import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { userService } from "@/services/userService";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CreditCard,
  ChevronLeft,
  Shield,
  Activity,
} from "lucide-react";

const UserDetail = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await userService.getUserById(id);
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  const StatusBadge = ({ status }) => {
    const statusClasses = {
      active: "bg-green-100 text-green-800",
      deactivated: "bg-yellow-100 text-yellow-800",
      deleted: "bg-red-100 text-red-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          statusClasses[status] || ""
        }`}
      >
        {status}
      </span>
    );
  };

  const RoleBadge = ({ role }) => {
    const roleClasses = {
      admin: "bg-purple-100 text-purple-800",
      manager: "bg-blue-100 text-blue-800",
      customer: "bg-gray-100 text-gray-800",
    };

    return (
      <span
        className={`px-2 py-1 rounded-full text-xs font-medium ${
          roleClasses[role] || ""
        }`}
      >
        {role}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen text-foreground">
        User not found
      </div>
    );
  }

  return (
    <div className="space-y-6 p-10 pb-16 md:block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">User Details</h2>
        <p className="text-muted-foreground">
          Viewing information for {user.name}
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        <aside className="lg:w-1/4">
          <h2 className="font-semibold">User Information</h2>
          <p className="text-sm text-muted-foreground">
            View and manage the user's details and account information.
          </p>
        </aside>
        <div className="flex-1 lg:max-w-2xl space-y-6">
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-muted-foreground" />
                <Label className="text-muted-foreground">Name</Label>
              </div>
              <div className="font-medium">{user.name}</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <Label className="text-muted-foreground">Email</Label>
              </div>
              <div className="font-medium">{user.email}</div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Shield className="h-4 w-4 text-muted-foreground" />
                <Label className="text-muted-foreground">Role</Label>
              </div>
              <RoleBadge role={user.role} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Activity className="h-4 w-4 text-muted-foreground" />
                <Label className="text-muted-foreground">Account Status</Label>
              </div>
              <StatusBadge status={user.accountStatus} />
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <Label className="text-muted-foreground">Phone Number</Label>
              </div>
              <div className="font-medium">
                {user.personalDetails?.phoneNumber || "N/A"}
              </div>
            </div>

            <div className="space-y-2 md:col-span-2">
              <div className="flex items-center space-x-2">
                <MapPin className="h-4 w-4 text-muted-foreground" />
                <Label className="text-muted-foreground">Address</Label>
              </div>
              <div className="font-medium">
                {`${user.personalDetails?.country || "N/A"}, ${
                  user.personalDetails?.city || "N/A"
                }, ${user.personalDetails?.state || "N/A"}, ${
                  user.personalDetails?.postalCode || "N/A"
                }`}
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Methods</h3>
            {user.paymentMethods && user.paymentMethods.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {user.paymentMethods.map((method, index) => (
                  <div
                    key={index}
                    className="bg-muted rounded-lg p-4 hover:bg-accent transition-colors"
                  >
                    <div className="font-medium">{method.type}</div>
                    <div className="text-sm text-muted-foreground">
                      {JSON.stringify(method.details)}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-muted-foreground">
                No payment methods available
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <Button
              onClick={() => navigate("/user-management")}
              variant="outline"
            >
              Back to Users
            </Button>
            <Button onClick={() => navigate(`/users/${user._id}/edit`)}>
              Edit User
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDetail;
