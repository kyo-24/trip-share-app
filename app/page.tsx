import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export default function Home() {
  return (
    <div className="p-6">
      <div className="flex justify-between items-center px-4">
        <h1 className="font-bold text-2xl">旅行プラン一覧</h1>
        <div className="flex justify-between items-center gap-2">
          <Input />
          <Button variant="secondary" size="lg">新規プラン作成</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 py-10">
        <Card className="py-0 border-0 shadow-lg">
          <CardHeader className="px-0">
            <div className="w-full h-[200px] bg-gray-200 rounded-xl rounded-b-none"></div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="font-semibold text-2xl ">北海道旅行</div>
            <div className="text-sm text-gray-500">
              <p>2025年4月1日</p>
              <p>北海道札幌市</p>
              <p>3人の参加者</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
          </CardFooter>
        </Card>
        <Card className="py-0 border-0 shadow-lg">
          <CardHeader className="px-0">
            <div className="w-full h-[200px] bg-gray-200 rounded-xl rounded-b-none"></div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="font-semibold text-2xl ">北海道旅行</div>
            <div className="text-sm text-gray-500">
              <p>2025年4月1日</p>
              <p>北海道札幌市</p>
              <p>3人の参加者</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
          </CardFooter>
        </Card>
        <Card className="py-0 border-0 shadow-lg">
          <CardHeader className="px-0">
            <div className="w-full h-[200px] bg-gray-200 rounded-xl rounded-b-none"></div>
          </CardHeader>
          <CardContent className="p-4">
            <div className="font-semibold text-2xl ">北海道旅行</div>
            <div className="text-sm text-gray-500">
              <p>2025年4月1日</p>
              <p>北海道札幌市</p>
              <p>3人の参加者</p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
