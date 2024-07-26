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
import { useAction } from "next-safe-action/hooks";
import { attendance } from "~/actions/attendance";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function KruTable({
  data,
  page,
  setPage,
  lastpage,
  author,
  setActive,
  ids,
  div,
}: {
  data: {
    name: string;
    division: string;
    attendance: number;
    totalAttendance: number;
    updatedAt: string;
    id: string;
    isAttending: boolean;
    desc?: "PRESENT" | "ABSENT" | "LATE" | "PERMITS";
  }[];
  ids: string;
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  setActive: Dispatch<SetStateAction<string | null>>;
  lastpage: number;
  author: string;
  div: string;
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
    onExecute: () => {
      toast.loading("Loading...");
    },
  });

  async function handleAttend(
    status: "PRESENT" | "ABSENT" | "LATE" | "PERMITS",
    id: string,
  ) {
    const res = await executeAsync({
      userId: id,
      authorId: author,
      status,
      date: new Date().toISOString().slice(0, 10),
    });

    console.log(res);
  }

  return (
    <Card x-chunk="dashboard-06-chunk-0" className="bg-muted/40">
      <CardHeader>
        <CardTitle>
          <motion.p layoutId={`cakrai-${ids + page + div}`}>CAKRAI</motion.p>
        </CardTitle>
        <CardDescription className="text-slate-800">
          <motion.p layoutId={`modal-${ids}`}></motion.p>
          Manage your brow and sist and view their performance. Click a row to
          see its details.
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
              <TableHead className="hidden text-center text-violet-600 md:table-cell">
                Attendace
              </TableHead>
              <TableHead className="text-center text-violet-600">
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
              if (index < (page - 1) * 9 || index >= page * 9) return null;

              return (
                <TableRow key={index} onClick={() => setActive(cakrai.name)}>
                  <TableCell className="font-medium">
                    <motion.p
                      layoutId={`name-${cakrai.name + ids + div}`}
                      className="line-clamp-1"
                    >
                      {cakrai.name}
                    </motion.p>
                  </TableCell>
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
                      <motion.p
                        layoutId={`division-${cakrai.name + ids + div}`}
                      >
                        {cakrai.division}
                      </motion.p>
                    </Badge>
                  </TableCell>
                  <TableCell className="hidden text-center md:table-cell">
                    {Math.round(cakrai.attendance * 100) / 100 + "%"}
                  </TableCell>
                  <TableCell className="text-center">
                    {cakrai.totalAttendance}
                  </TableCell>
                  <TableCell className="hidden text-center md:table-cell">
                    {cakrai.updatedAt}
                  </TableCell>
                  <TableCell>
                    {cakrai.isAttending ? (
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
                        <DropdownMenuContent
                          align="end"
                          className="bg-violet-400/75"
                        >
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              void handleAttend("PRESENT", cakrai.id);
                            }}
                            className="font-semibold text-white"
                          >
                            Present
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={(e) => {
                              e.stopPropagation();
                              void handleAttend("LATE", cakrai.id);
                            }}
                            className="font-semibold text-white"
                          >
                            Late
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="font-semibold text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              void handleAttend("PERMITS", cakrai.id);
                            }}
                          >
                            Permits
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="font-semibold text-white"
                            onClick={(e) => {
                              e.stopPropagation();
                              void handleAttend("ABSENT", cakrai.id);
                            }}
                          >
                            Absent
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    ) : (
                      <motion.h4
                        layoutId={`status-${cakrai.name + ids + div}`}
                        className="capitalize"
                      >
                        {cakrai.desc?.toLowerCase()}
                      </motion.h4>
                    )}
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
            {(page - 1) * 9 +
              1 +
              " - " +
              (page === lastpage ? data.length : page * 9)}
          </strong>{" "}
          of <strong>{data.length}</strong> cakrais
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <button
            className="cursor-pointer disabled:cursor-not-allowed disabled:select-none disabled:opacity-50"
            onClick={() => setPage((prev) => prev - 1)}
            disabled={page === 1}
          >
            <FiChevronLeft />
          </button>
          <div className="text-xs">{page}</div>
          <button
            className="cursor-pointer disabled:cursor-not-allowed disabled:select-none disabled:opacity-50"
            onClick={() => setPage((prev) => prev + 1)}
            disabled={page === lastpage}
          >
            <FiChevronRight />
          </button>
        </div>
      </CardFooter>
    </Card>
  );
}
