"use client";

import { useTranslation } from "react-i18next";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search } from "lucide-react";
import { getLocalizedCategory } from "@/utils/integrationLocalization";

interface IntegrationsFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (value: string) => void;
  categories: string[];
}

export function IntegrationsFilters({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
  categories,
}: IntegrationsFiltersProps) {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <div className="flex-1">
        <Label htmlFor="search-integrations" className="sr-only">
          {t("integrations.filters.search") || "Search integrations"}
        </Label>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="search-integrations"
            type="search"
            placeholder={
              t("integrations.filters.searchPlaceholder") ||
              "Search integrations..."
            }
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10"
            aria-label={t("integrations.filters.search") || "Search integrations"}
          />
        </div>
      </div>

      <div className="sm:w-64">
        <Label htmlFor="category-filter" className="sr-only">
          {t("integrations.filters.category") || "Filter by category"}
        </Label>
        <Select value={selectedCategory} onValueChange={onCategoryChange}>
          <SelectTrigger id="category-filter">
            <SelectValue
              placeholder={
                t("integrations.filters.allCategories") || "All Categories"
              }
            />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">
              {t("integrations.filters.allCategories") || "All Categories"}
            </SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {getLocalizedCategory(category, t)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}
