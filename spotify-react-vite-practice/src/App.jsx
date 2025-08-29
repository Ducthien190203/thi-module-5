import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import SongList from './components/SongList';
import SongForm from './components/SongForm';

const API = 'http://localhost:3001/songs';

export default function App() {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    fetchSongs();
  }, []);

  async function fetchSongs() {
    try {
      setLoading(true);
      const res = await axios.get(API);
      setSongs(res.data);
    } catch (err) {
      console.error('Fetch songs error', err);
      alert('Không thể kết nối đến server JSON. Chạy json-server trước khi dev.');
    } finally {
      setLoading(false);
    }
  }

  async function addSong(newSong) {
    try {
      const res = await axios.post(API, newSong);
      setSongs(prev => [...prev, res.data]);
    } catch (err) {
      console.error('Add song error', err);
      alert('Lỗi khi thêm bài hát');
    }
  }

  async function updateSongStatus(songId, newStatus) {
    try {
      const res = await axios.patch(`${API}/${songId}`, { status: newStatus });
      setSongs(songs.map(song => (song.id === songId ? res.data : song)));
    } catch (err) {
      console.error('Update song status error', err);
      alert('Lỗi khi cập nhật trạng thái bài hát');
    }
  }

  function handleSelect(song) {
    setSelected(song);
  }

  const filteredSongs = songs.filter((song) =>
    song.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container className="py-4">
      <h1 className="mb-3">Spotify - Kho nhạc</h1>

      <Row className="mb-3">
        <Col>
          <div className="player-card p-3 rounded shadow-sm">
            <strong>Đang chọn:</strong>{' '}
            {selected ? (
              <span className="fw-bold">{selected.name} — {selected.singer}</span>
            ) : (
              <span className="text-muted">Chưa có bài chọn</span>
            )}
          </div>
        </Col>
      </Row>

      <Row>
        <Col md={7} className="mb-4">
          <SongList
            songs={filteredSongs}
            loading={loading}
            onSelect={handleSelect}
            search={search}
            setSearch={setSearch}
            onUpdateStatus={updateSongStatus}
          />
        </Col>

        <Col md={5}>
          <SongForm onAdd={addSong} />
        </Col>
      </Row>
    </Container>
  );
}