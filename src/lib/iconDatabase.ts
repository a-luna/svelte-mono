import Aws from "$lib/components/Icons/Language/AWS.svelte";
import Cypress from "$lib/components/Icons/Language/Cypress.svelte";
import Database from "$lib/components/Icons/Language/Database.svelte";
import FastApi from "$lib/components/Icons/Language/FastAPI.svelte";
import Flask from "$lib/components/Icons/Language/Flask.svelte";
import Hugo from "$lib/components/Icons/Language/Hugo.svelte";
import Lxml from "$lib/components/Icons/Language/lxml.svelte";
import Microsoft from "$lib/components/Icons/Language/Microsoft.svelte";
import NoTechFilter from "$lib/components/Icons/Language/NoTechFilter.svelte";
import Puppeteer from "$lib/components/Icons/Language/Puppeteer.svelte";
import Python from "$lib/components/Icons/Language/Python.svelte";
import Redis from "$lib/components/Icons/Language/Redis.svelte";
import RegExp from "$lib/components/Icons/Language/RegExp.svelte";
import Shell from "$lib/components/Icons/Language/Shell.svelte";
import Sqlite from "$lib/components/Icons/Language/Sqlite.svelte";
import Svelte from "$lib/components/Icons/Language/Svelte.svelte";
import Tailwind from "$lib/components/Icons/Language/Tailwind.svelte";
import TypeScript from "$lib/components/Icons/Language/TypeScript.svelte";
import Xml from "$lib/components/Icons/Language/XML.svelte";
import XState from "$lib/components/Icons/Language/XState.svelte";
import type { FilterSetting, IconDatabase, IconDetails } from "$lib/types";
import Backend from "./components/Icons/Category/Backend.svelte";
import Frontend from "./components/Icons/Category/Frontend.svelte";
import NoCategoryFilter from "./components/Icons/Category/NoCategoryFilter.svelte";

export const iconDatabase: IconDatabase = {
  allLanguages: {
    icon: NoTechFilter,
    displayName: "All Languages",
    color: "blue",
    size: 16,
  },
  allCategories: {
    icon: NoCategoryFilter,
    displayName: "All Categoriesr",
    color: "green",
    size: 16,
  },
  frontend: {
    icon: Frontend,
    displayName: "Frontend",
    color: "pink",
    size: 16,
  },
  backend: {
    icon: Backend,
    displayName: "Backend",
    color: "blue",
    size: 16,
  },
  AWS: {
    icon: Aws,
    displayName: "AWS/Boto3",
    color: "yellow",
    size: 20,
  },
  CSharp: {
    icon: Microsoft,
    displayName: "C#",
    color: "blue",
    size: 16,
  },
  Cypress: {
    icon: Cypress,
    displayName: "Cypress",
    color: "green",
    size: 16,
  },
  FastAPI: {
    icon: FastApi,
    displayName: "FastAPI",
    color: "blue",
    size: 16,
  },
  Flask: {
    icon: Flask,
    displayName: "Flask",
    color: "pink",
    size: 20,
  },
  Hugo: { icon: Hugo, displayName: "Hugo", color: "pink", size: 16 },
  lxml: {
    icon: Lxml,
    displayName: "lxml",
    color: "yellow",
    size: 16,
  },
  Puppeteer: {
    icon: Puppeteer,
    displayName: "Puppeteer",
    color: "blue",
    size: 20,
  },
  Pydantic: {
    icon: Python,
    displayName: "Pydantic",
    color: "green",
    size: 16,
  },
  Python: {
    icon: Python,
    displayName: "Python",
    color: "green",
    size: 16,
  },
  Redis: { icon: Redis, displayName: "Redis", color: "pink", size: 16 },
  RegExp: {
    icon: RegExp,
    displayName: "Regular Expressions",
    color: "blue",
    size: 16,
  },
  Shell: {
    icon: Shell,
    displayName: "Shell",
    color: "yellow",
    size: 16,
  },
  SQLAlchemy: {
    icon: Database,
    displayName: "SQLAlchemy",
    color: "yellow",
    size: 16,
  },
  SQLite: {
    icon: Sqlite,
    displayName: "SQLite",
    color: "pink",
    size: 16,
  },
  Svelte: {
    icon: Svelte,
    displayName: "Svelte",
    color: "pink",
    size: 18,
  },
  TailwindCSS: {
    icon: Tailwind,
    displayName: "TailwindCSS",
    color: "blue",
    size: 16,
  },
  TypeScript: {
    icon: TypeScript,
    displayName: "TypeScript",
    color: "blue",
    size: 15,
  },
  XPath: {
    icon: Xml,
    displayName: "XPath",
    color: "green",
    size: 16,
  },
  XState: {
    icon: XState,
    displayName: "XState",
    color: "yellow",
    size: 16,
  },
};

export const getIconDetails = (name: FilterSetting): IconDetails =>
  iconDatabase[name];
