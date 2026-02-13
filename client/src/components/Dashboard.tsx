import { useEffect, useState, useCallback } from "react";
import { getTodos } from "@/services/todo.service";
import { TodoCard } from "@/components/TodoCard";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { LogOut, Search, ChevronLeft, ChevronRight } from "lucide-react";
import { toast } from "sonner";
import type { Todo } from "@/lib/utils";
import { logoutService } from "@/services/auth.service";
import { useNavigate } from "react-router";
import { TodoDialog } from "@/components/TodoDialog";

export default function Dashboard() {
  const navigate = useNavigate();

  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);

  // State for Pagination & Search
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");

  // check if within 3-100 range (or empty)
  const isSearchValid = 
    searchKeyword.length === 0 || 
    (searchKeyword.length >= 3 && searchKeyword.length <= 100);

  // Debounce logic
  useEffect(() => {
    // Only update debounced keyword if validation passes
    if (isSearchValid) {
      const timer = setTimeout(() => {
        setDebouncedKeyword(searchKeyword);
        setCurrentPage(1);
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [searchKeyword, isSearchValid]);

  const fetchTodos = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getTodos(currentPage, 9, debouncedKeyword);
      setTodos(data.todos);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      toast.error("Could not fetch todos");
      console.error("Fetch todos error:", error);
    } finally {
      setLoading(false);
    }
  }, [currentPage, debouncedKeyword]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleLogout = async () => {
    try {
      await logoutService();
      toast.success("Logged out successfully");
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed");
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <h1 className="text-4xl font-extrabold tracking-tight">Dashboard</h1>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={handleLogout}
            className="gap-2"
          >
            <LogOut className="h-4 w-4" /> Logout
          </Button>
          <TodoDialog mode="create" onSuccess={fetchTodos} />
        </div>
      </div>

      {/* Search Bar Section */}
      <div className="mb-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tasks..."
            className={`pl-10 max-w-md ${!isSearchValid ? "border-destructive focus-visible:ring-destructive" : ""}`}
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
        </div>
        
        {/* Validation Error Message */}
        {!isSearchValid && (
          <p className="text-destructive text-xs mt-1 transition-all">
            {searchKeyword.length < 3 
              ? "Please enter at least 3 characters to search" 
              : "Search query is too long (max 100 characters)"}
          </p>
        )}
      </div>

      {/* Content Section */}
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <p className="text-muted-foreground animate-pulse text-center col-span-full py-10">
            Loading tasks...
          </p>
        </div>
      ) : (
        <>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 min-h-100">
            {todos.length > 0 ? (
              todos.map((todo) => (
                <TodoCard key={todo._id} todo={todo} onRefresh={fetchTodos} />
              ))
            ) : (
              <div className="col-span-full py-20 text-center border-2 border-dashed rounded-lg">
                <h3 className="text-lg font-medium">No todos found</h3>
                <p className="text-muted-foreground">
                  Try a different search or add a task.
                </p>
              </div>
            )}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 mt-10">
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
