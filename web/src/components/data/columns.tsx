"use client"

import { ColumnDef } from "@tanstack/react-table"

import * as cpf from 'validation-br/dist/cpf'
import * as cnpj from 'validation-br/dist/cnpj'
import { lightFormat, parse } from "date-fns"
import { cn } from "@/lib/utils"

export type Data = {
  nrInst: number;
  nrAgencia: number;
  cdClient: string;
  nmClient: number;
  nrCpfCnpj: number;
  nrContrato: string;
  dtContrato: string;
  qtPrestacoes: string;
  vlTotal: string;
  cdProduto: string;
  dsProduto: string;
  cdCarteira: string;
  dsCarteira: string;
  nrProposta: string;
  nrPresta: string;
  tpPresta: string;
  nrSeqPre: string;
  dtVctPre: string;
  vlPresta: string;
  vlMora: string;
  vlMulta: string;
  vlOutAcr: string;
  vlIof: string;
  vlDescon: string;
  vlAtual: string;
  idSituac: string;
  idSitVen: string;
}

export const columns: ColumnDef<Data>[] = [
  { accessorKey: "nrInst" },
  { accessorKey: "nrAgencia" },
  { accessorKey: "cdClient" },
  { accessorKey: "nmClient" },
  {
    accessorKey: "nrCpfCnpj",
    cell: ({ row }) => {
      const nr = String(row.getValue("nrCpfCnpj"));

      if (cpf.validate(nr)) {
        return cpf.mask(nr);
      }

      if (cnpj.validate(nr)) {
        return cnpj.mask(nr);
      }

      if (nr.length === 11) {
        return cpf.fake(true);
      }

      return cnpj.fake(true);
    }
  },
  { accessorKey: "nrContrato" },
  {
    accessorKey: "dtContrato",
    cell: ({ row }) => {
      const dtContrato = row.getValue('dtContrato') as string;
      const year = dtContrato.substring(0, 4);
      const month = dtContrato.substring(4, 6);
      const day = dtContrato.substring(6);

      return lightFormat(new Date(`${year}-${month}-${day}`), 'dd/MM/yyyy');
    }
  },
  { accessorKey: "qtPrestacoes" },
  {
    accessorKey: "vlTotal",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("vlTotal")) ?? 0
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return formatted
    }
  },
  {
    accessorKey: "vlMovimento",
    cell: ({ row }) => {
      const vlTotal = parseFloat(row.getValue("vlTotal")) ?? 0;
      const qtPrestacoes = parseInt(row.getValue("qtPrestacoes")) ?? 0;

      const resultado = Math.round(vlTotal / qtPrestacoes);

      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(resultado);

      return formatted
    }
  },
  { accessorKey: "cdProduto" },
  { accessorKey: "dsProduto" },
  { accessorKey: "cdCarteira" },
  { accessorKey: "dsCarteira" },
  { accessorKey: "nrProposta" },
  { accessorKey: "nrPresta" },
  { accessorKey: "tpPresta" },
  { accessorKey: "nrSeqPre" },
  {
    accessorKey: "dtVctPre",
    cell: ({ row }) => {
      const dtVctPre = row.getValue('dtVctPre') as string;
      const year = dtVctPre.substring(0, 4);
      const month = dtVctPre.substring(4, 6);
      const day = dtVctPre.substring(6);

      return lightFormat(new Date(`${year}-${month}-${day}`), 'dd/MM/yyyy');
    }
  },
  {
    accessorKey: "vlPresta",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("vlPresta")) ?? 0
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return formatted
    }
  },
  {
    accessorKey: "vlMora",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("vlMora")) ?? 0
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return formatted
    }
  },
  {
    accessorKey: "vlMulta",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("vlMulta")) ?? 0
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return formatted
    }
  },
  {
    accessorKey: "vlOutAcr",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("vlOutAcr")) ?? 0
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return formatted
    }
  },
  {
    accessorKey: "vlIof",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("vlIof")) ?? 0
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return formatted
    }
  },
  {
    accessorKey: "vlDescon",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("vlDescon")) ?? 0
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return formatted
    }
  },
  {
    accessorKey: "vlAtual",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("vlAtual")) ?? 0
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount);

      return formatted
    }
  },
  {
    accessorKey: "idSituac",
  },
  {
    accessorKey: "idSitVen",
  }
]
