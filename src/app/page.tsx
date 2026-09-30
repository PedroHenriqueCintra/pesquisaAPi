"use client";

import { useState } from "react";

import {
  Box,
  Paper,
  Typography,
  TextField,
  Switch,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import RefreshIcon from "@mui/icons-material/Refresh";

import styles from "./page.module.css";
import { ConectarApi, MudarHistorico } from "./api/api";

export default function Home() {
  const [checked, setChecked] = useState<boolean>(false);
  const [usuario, setUsuario] = useState<string>("");
  const [historicos, setHistoricos] = useState<any[]>([]);

  const handleSearch = async () => {
    const dados = await ConectarApi(usuario);
    setHistoricos(dados);
  };

  async function ligarDesligar() {
    const dados = await MudarHistorico(usuario);
    setChecked(dados.estado);
  }

  return (
    <Box className={styles.container}>
      <Paper elevation={2} className={styles.header}>
        <Box className={styles.headerTitle}>
          <Typography variant="body2" color="text.secondary">
            Historico
          </Typography>
        </Box>

        <Box className={styles.headerActions}>
          <TextField
            label="Usuario"
            value={usuario}
            onChange={(event) => setUsuario(event.target.value)}
            size="small"
            variant="outlined"
          />

          <Tooltip title="Pesquisar">
            <IconButton
              color="primary"
              onClick={handleSearch}
              aria-label="Pesquisar"
            >
              <SearchIcon />
            </IconButton>
          </Tooltip>

          <Tooltip title="Ativado ou desativado">
            <IconButton aria-label="Modo de iluminacao">
              <LightbulbIcon />
            </IconButton>
          </Tooltip>

          <Switch
            checked={checked}
            onChange={ligarDesligar}
          />
        </Box>
      </Paper>

      <Paper elevation={2} className={styles.history}>
        <Box className={styles.historyHeader}>
          <Box className={styles.historyTitle}>
            <Box>
              <Typography variant="h6">
                Historico
              </Typography>

              <Typography variant="body2" color="text.secondary">
                Registros de consultas
              </Typography>
            </Box>
          </Box>

          <Tooltip title="Atualizar historico">
            <IconButton
              color="primary"
              aria-label="Atualizar historico"
              onClick={handleSearch}
            >
              <RefreshIcon />
            </IconButton>
          </Tooltip>
        </Box>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Usuario</TableCell>
                <TableCell>Data</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {historicos.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.usuario}</TableCell>
                  <TableCell>{item.hora}</TableCell>
                  <TableCell>
                    {item.estado ? "ligado" : "desligado"}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
}