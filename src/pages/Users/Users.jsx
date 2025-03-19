import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DataTable } from "./data-table";
import { getColumns } from "./columns";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users as UsersIcon, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { userService } from "@/services/userService";
import { toast } from "@/hooks/use-toast";
import { Toaster } from "@/components/ui/toaster";

export default function Users() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [search, setSearch] = useState("");
  const [role, setRole] = useState("all");
  const [accountStatus, setAccountStatus] = useState("all");
  const [isLoading, setIsLoading] = useState(false);

  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const result = await userService.getUsers(
        page,
        search,
        role,
        accountStatus
      );
      setData(result.users);
      setTotalPages(result.totalPages);
    } catch (error) {
      console.error("Error fetching users:", error);
      toast({
        title: "Error",
        description: "Failed to fetch users. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, [page, search, role, accountStatus]);

  const handleViewUser = (user) => {
    navigate(`/users/${user._id}`);
  };

  const handleEditUser = (user) => {
    navigate(`/users/${user._id}/edit`);
  };

  const handleDeleteUser = async (user) => {
    try {
      await userService.deleteUser(user._id);
      toast({
        title: "Success",
        description: "User deleted successfully.",
      });
      fetchUsers();
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Error",
        description: "Failed to delete user. Please try again.",
        variant: "destructive",
      });
    }
  };

  const columns = getColumns({
    onViewUser: handleViewUser,
    onEditUser: handleEditUser,
    onDeleteUser: handleDeleteUser,
  });

  return (
    <div className="space-y-6 p-10 pb-16">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">
            View and manage user accounts in your system.
          </p>
        </div>
        <Button
          onClick={() => navigate("/users/new")}
          className="bg-primary hover:bg-primary/90"
        >
          Add New User
        </Button>
      </div>

      <div className="flex flex-col space-y-4 lg:flex-row lg:space-y-0 lg:space-x-4">
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search users..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-background text-foreground"
            />
          </div>
        </div>
        <div className="flex space-x-4">
          <Select value={role} onValueChange={setRole}>
            <SelectTrigger className="w-[180px] bg-background text-foreground">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All roles</SelectItem>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="manager">Manager</SelectItem>
              <SelectItem value="supplier">Supplier</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
          <Select value={accountStatus} onValueChange={setAccountStatus}>
            <SelectTrigger className="w-[180px] bg-background text-foreground">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All statuses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="deactivated">Deactivated</SelectItem>
              <SelectItem value="deleted">Deleted</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      ) : (
        <div className="rounded-md border">
          <DataTable columns={columns} data={data} />
        </div>
      )}

      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Page {page} of {totalPages}
        </p>
        <div className="space-x-2">
          <Button
            onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
            disabled={page === 1}
            variant="outline"
          >
            Previous
          </Button>
          <Button
            onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={page === totalPages}
            variant="outline"
          >
            Next
          </Button>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
