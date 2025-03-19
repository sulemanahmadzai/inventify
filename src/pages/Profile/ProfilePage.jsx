"use client";

import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { profileService } from "@/services/profileService";
import { toast } from "@/hooks/use-toast";

import BasicInfoForm from "@/components/Profile/BasicInfoForm";
import ChangePasswordForm from "@/components/Profile/ChangePasswordForm";

const ProfilePage = () => {
  const [profile, setProfile] = useState(null);
  const [activeTab, setActiveTab] = useState("basic-info");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const profileData = await profileService.fetchProfile();
        setProfile(profileData);
      } catch (error) {
        console.error("Error fetching profile:", error);
        toast({
          title: "Error",
          description: "Failed to load profile information.",
          variant: "destructive",
        });
      }
    };

    fetchData();
  }, []);

  if (!profile) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background px-4">
        <div className="flex flex-col items-center space-y-4">
          <Skeleton className="h-24 w-24 rounded-full" />
          <Skeleton className="h-6 w-60" />
          <Skeleton className="h-4 w-40" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col">
        <div className="w-full flex justify-center mb-5">
          <div className="space-y-4 text-center">
            <Avatar className="w-32 h-32 mx-0">
              <AvatarImage src={profile.avatarUrl} alt={profile.name} />
              <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <h2 className="text-2xl font-bold">{profile.name}</h2>
            <p className="text-muted-foreground">{profile.email}</p>
          </div>
        </div>

        <main className="flex-1">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="flex overflow-x-auto border-b border-gray-200 mb-4">
              <TabsTrigger value="basic-info" className="whitespace-nowrap">
                Basic Info
              </TabsTrigger>
              <TabsTrigger value="security" className="whitespace-nowrap">
                Security
              </TabsTrigger>
            </TabsList>

            <div className="mt-4">
              <TabsContent value="basic-info">
                <ScrollArea className="max-h-[70vh] overflow-auto">
                  <BasicInfoForm
                    profile={profile}
                    onUpdate={async () => {
                      const updatedProfile =
                        await profileService.fetchProfile();
                      setProfile(updatedProfile);
                    }}
                  />
                </ScrollArea>
              </TabsContent>
              <TabsContent value="security">
                <ScrollArea className="max-h-[70vh] overflow-auto">
                  <ChangePasswordForm />
                </ScrollArea>
              </TabsContent>
            </div>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default ProfilePage;
