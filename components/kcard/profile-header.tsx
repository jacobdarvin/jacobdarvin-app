import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function ProfileHeader() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <Avatar className="w-32 h-32">
        <AvatarImage src="/me.jpeg" alt="Jacob Darvin" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
      <div className="text-center">
        <h2 className="text-2xl font-bold">Jacob Darvin</h2>
        <p className="text-muted-foreground">Designer @ Ckard</p>
      </div>
    </div>
  );
}
