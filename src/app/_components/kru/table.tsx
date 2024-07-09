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

export default function KruTable({
  data,
  page,
  setPage,
  lastpage,
}: {
  data: {
    name: string;
    division: string;
    attendance: number | string;
    totalAttendance: number | string;
    updatedAt: string;
  }[];
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  lastpage: number;
}) {
  return (
    <Card x-chunk="dashboard-06-chunk-0" className='bg-muted/40'>
      <CardHeader>
        <CardTitle>CAKRAI</CardTitle>
        <CardDescription className='text-slate-800'>
          Manage your brow and sist and view their performance.
        </CardDescription>
      </CardHeader>
      <CardContent className=''>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className=" text-violet-600">Name</TableHead>
              <TableHead className="hidden text-center md:table-cell text-violet-600">
                Division
              </TableHead>
              <TableHead className="text-center text-violet-600">Attendace</TableHead>
              <TableHead className="hidden text-center md:table-cell text-violet-600">
                Total Attendance
              </TableHead>
              <TableHead className="hidden text-center md:table-cell text-violet-600">
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
                        <DropdownMenuItem>Present</DropdownMenuItem>
                        <DropdownMenuItem>Late</DropdownMenuItem>
                        <DropdownMenuItem>Absent</DropdownMenuItem>
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
        <div className="text-muted-foreground text-xs">
          Showing{" "}
          <strong>
            {(page - 1) * 6 +
              1 +
              " - " +
              (page === lastpage ? data.length : page * 6)}
          </strong>{" "}
          of <strong>{data.length}</strong> cakrais
        </div>
        <div className="text-muted-foreground flex items-center gap-4 text-sm">
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
