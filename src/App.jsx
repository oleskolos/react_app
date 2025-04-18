import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu";

import memesData from "./memes.json";

export default function App() {
  const [memes, setMemes] = useState(memesData);
  const [editingMeme, setEditingMeme] = useState(null);
  const [formState, setFormState] = useState({ title: "", image: "", likes: 0 });

  const handleEdit = (meme) => {
    setEditingMeme(meme);
    setFormState(meme);
  };

  const handleSave = () => {
    setMemes(memes.map(m => m.id === editingMeme.id ? { ...editingMeme, ...formState } : m));
    setEditingMeme(null);
  };

  return (
    <div className="p-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">📚 Meme Довідник</h1>
      <Tabs defaultValue="table">
        <TabsList>
          <TabsTrigger value="table">📊 Таблиця</TabsTrigger>
          <TabsTrigger value="list">🖼️ Список</TabsTrigger>
        </TabsList>

        <TabsContent value="table">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Назва</TableHead>
                <TableHead>Лайки</TableHead>
                <TableHead>Дії</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {memes.map((meme) => (
                <TableRow key={meme.id}>
                  <TableCell>{meme.id}</TableCell>
                  <TableCell>{meme.title}</TableCell>
                  <TableCell>{meme.likes}</TableCell>
                  <TableCell>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button size="sm" onClick={() => handleEdit(meme)}>Редагувати</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <h2 className="text-xl font-bold mb-2">Редагування</h2>
                        <Input
                          className="mb-2"
                          placeholder="Назва"
                          value={formState.title}
                          onChange={(e) => setFormState({ ...formState, title: e.target.value })}
                        />
                        <Input
                          className="mb-2"
                          placeholder="Картинка (URL)"
                          value={formState.image}
                          onChange={(e) => setFormState({ ...formState, image: e.target.value })}
                        />
                        <Input
                          type="number"
                          placeholder="Лайки"
                          value={formState.likes}
                          onChange={(e) => setFormState({ ...formState, likes: +e.target.value })}
                        />
                        <Button onClick={handleSave}>Зберегти</Button>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TabsContent>

        <TabsContent value="list" className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4">
          {memes.map((meme) => (
            <Card key={meme.id} className="flex flex-col h-full">
            <CardContent className="p-4 flex flex-col items-center justify-between h-full">
              <img
                src={meme.image}
                alt={meme.title}
                className="rounded-lg w-full h-48 object-cover mb-4"
              />
              <div className="text-center flex flex-col flex-grow justify-between">
                <h2 className="font-semibold text-lg mb-1">{meme.title}</h2>
                <p className="text-sm mb-2">❤️ {meme.likes} лайків</p>
                <a
                  href={meme.image}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-auto inline-block bg-blue-600 text-white text-sm font-medium py-1.5 px-4 rounded-lg shadow hover:bg-blue-700 transition-all"
                >
                  🔗 Відкрити зображення
                </a>
              </div>
            </CardContent>
          </Card>
          
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}