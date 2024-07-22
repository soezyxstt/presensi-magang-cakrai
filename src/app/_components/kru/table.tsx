import { Button } from "@/components/ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal } from "lucide-react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { type Dispatch, type SetStateAction } from "react";
import { useAction } from 'next-safe-action/hooks';
import { attendance } from '~/actions/attendance';
import { toast } from 'sonner';

export default function KruTable({
  data,
  page,
  setPage,
  lastpage,
  author,
}: {
  data: {
    name: string;
    division: string;
    attendance: number | string;
    totalAttendance: number | string;
    updatedAt: string;
    id: string;
  }[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  lastpage: number;
  author: string;
  }) {
  const { executeAsync } = useAction(attendance, {
    onSuccess: (data) => {
      console.log(data);
      toast.success(data.data?.message);
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.error.serverError);
    },
  })

  async function handleAttend(status: 'PRESENT' | 'ABSENT' | 'LATE', id: string) {
    const res = await executeAsync({
      userId: id,
      authorId: author,
      status,
      date: new Date(),
    });

    console.log(res);
  }
  return (
    <Card x-chunk="dashboard-06-chunk-0" className="bg-muted/40">
      <CardHeader>
        <CardTitle>CAKRAI</CardTitle>
        <CardDescription className="text-slate-800">
          Manage your brow and sist and view their performance.
        </CardDescription>
      </CardHeader>
      <CardContent className="">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-violet-600">Name</TableHead>
              <TableHead className="hidden text-center text-violet-600 md:table-cell">
                Division
              </TableHead>
              <TableHead className="text-center text-violet-600">
                Attendace
              </TableHead>
              <TableHead className="hidden text-center text-violet-600 md:table-cell">
                Total Attendance
              </TableHead>
              <TableHead className="hidden text-center text-violet-600 md:table-cell">
                Updated At
              </TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((cakrai, index) => {
              if (index < (page - 1) * 6 || index >= page * 6) return null;

              return (
                <TableRow key={index}>
                  <TableCell className="font-medium">{cakrai.name}</TableCell>
                  <TableCell className="hidden text-center md:table-cell">
                    <Badge
                      variant="outline"
                      className={
                        cakrai.division.toLowerCase() === "mechanic"
                          ? "border-cyan-400"
                          : cakrai.division.toLowerCase() === "control"
                            ? "border-violet-400"
                            : "border-pink-400"
                      }
                    >
                      {cakrai.division}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    {cakrai.attendance + "%"}
                  </TableCell>
                  <TableCell className="hidden text-center md:table-cell">
                    {cakrai.totalAttendance}
                  </TableCell>
                  <TableCell className="hidden text-center md:table-cell">
                    {cakrai.updatedAt}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          aria-haspopup="true"
                          size="icon"
                          variant="ghost"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem onClick={() => handleAttend('PRESENT', cakrai.id)}>Present</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAttend('LATE', cakrai.id)}>Late</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleAttend('PRESENT', cakrai.id)}>Absent</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
      <CardFooter className="flex justify-between">
        <div className="text-xs text-muted-foreground">
          Showing{" "}
          <strong>
            {(page - 1) * 6 +
              1 +
              " - " +
              (page === lastpage ? data.length : page * 6)}
          </strong>{" "}
          of <strong>{data.length}</strong> cakrais
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          {page === 1 || (
            <FiChevronLeft
              onClick={() => setPage((prev) => prev - 1)}
              className="cursor-pointer"
            />
          )}
          <div className="text-xs">{page}</div>
          {page === lastpage || (
            <FiChevronRight
              onClick={() => setPage((prev) => prev + 1)}
              className="cursor-pointer"
            />
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
