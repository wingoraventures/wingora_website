import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { createClient } from '@supabase/supabase-js'
import { Upload, Plus, Trash2, Save, LogOut, Search, Edit3, ChevronDown, ChevronUp, X, Check, Loader2, AlertCircle } from 'lucide-react'

const supabaseUrl = import.meta.env.VITE_ADMIN_SUPABASE_URL
const supabaseKey = import.meta.env.VITE_ADMIN_SUPABASE_ANON_KEY
const supabase = createClient(supabaseUrl, supabaseKey)

const uid = () => Date.now() + '_' + Math.random().toString(36).slice(2)

const blankProduct = () => ({
  id: uid(), dbId: null,
  name: '', product_code: '', image: null, imagePreview: '',
  count: '', rate: '', details: '', colour: '', style: '', image_url: '',
  saved: false, saving: false, saveError: ''
})
const blankSub = () => ({ id: uid(), dbId: null, name: '', products: [], saved: false, saving: false, saveError: '' })
const blankCat = () => ({ id: uid(), dbId: null, name: '', subCategories: [], saved: false, saving: false, saveError: '' })

// ── Convert DB rows to local state ────────────────────────────────────────────
const dbRowsToState = (catRows, subRows, prodRows, detailRows) =>
  catRows.map(cat => ({
    id: uid(), dbId: cat.id, name: cat.name || '',
    saved: true, saving: false, saveError: '',
    subCategories: subRows.filter(s => s.category_id === cat.id).map(sub => ({
      id: uid(), dbId: sub.id, name: sub.name || '',
      saved: true, saving: false, saveError: '',
      products: prodRows.filter(p => p.sub_category_id === sub.id).map(prod => {
        const detail = detailRows.find(d => d.product_code === prod.product_code)
        return {
          id: uid(), dbId: prod.id,
          name: prod.name || '', product_code: prod.product_code || '',
          image: null, imagePreview: prod.image_url || '', image_url: prod.image_url || '',
          count: prod.count?.toString() || '', rate: prod.rate?.toString() || '',
          details: detail?.details || '', colour: prod.colour || '', style: prod.style || '',
          saved: true, saving: false, saveError: ''
        }
      })
    }))
  }))

// ── Status Badge ──────────────────────────────────────────────────────────────
const StatusBadge = ({ saved, saving, error }) => {
  if (saving) return <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-medium"><Loader2 size={11} className="animate-spin" />Saving…</span>
  if (error)  return <span className="inline-flex items-center gap-1 text-xs text-rose-600 font-medium"><AlertCircle size={11} />{error}</span>
  if (saved)  return <span className="inline-flex items-center gap-1 text-xs text-green-600 font-medium"><Check size={11} />Saved</span>
  return <span className="text-xs text-amber-400 font-medium">Unsaved</span>
}

// ── Product Form ──────────────────────────────────────────────────────────────
const ProductForm = ({ category, sub, product, productIndex, updateProduct, removeProduct, handleImageUpload, saveProduct }) => (
  <div className={`p-3 sm:p-4 rounded-xl border-2 transition-all ${product.saved ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
    <div className="flex justify-between items-center mb-3">
      <span className="text-xs font-semibold text-amber-700">Product {productIndex + 1}</span>
      <button type="button" onClick={() => removeProduct(category.id, sub.id, product.id)}
        className="p-1.5 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors">
        <Trash2 size={14} />
      </button>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <div>
        <label className="block text-xs font-semibold text-amber-700 mb-1">Product Name *</label>
        <input type="text" value={product.name} placeholder="Product name"
          onChange={e => updateProduct(category.id, sub.id, product.id, 'name', e.target.value)}
          className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-900 text-sm" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-amber-700 mb-1">Product Code *</label>
        <input type="text" value={product.product_code} placeholder="e.g. SS1"
          onChange={e => updateProduct(category.id, sub.id, product.id, 'product_code', e.target.value)}
          className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-900 text-sm uppercase" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-amber-700 mb-1">Rate (₹) *</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-amber-500 text-sm font-semibold">₹</span>
          <input type="number" value={product.rate} placeholder="0.00" min="0" step="0.01"
            onChange={e => updateProduct(category.id, sub.id, product.id, 'rate', e.target.value)}
            className="w-full pl-7 pr-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-900 text-sm" />
        </div>
      </div>
      <div>
        <label className="block text-xs font-semibold text-amber-700 mb-1">Quantity</label>
        <input type="number" value={product.count} placeholder="Available quantity" min="0"
          onChange={e => updateProduct(category.id, sub.id, product.id, 'count', e.target.value)}
          className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-900 text-sm" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-amber-700 mb-1">Colour *</label>
        <input type="text" value={product.colour} placeholder="e.g. Gold, Silver"
          onChange={e => updateProduct(category.id, sub.id, product.id, 'colour', e.target.value)}
          className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-900 text-sm" />
      </div>
      <div>
        <label className="block text-xs font-semibold text-amber-700 mb-1">Style <span className="text-amber-400 font-normal">(optional)</span></label>
        <input type="text" value={product.style} placeholder="e.g. Traditional, Modern"
          onChange={e => updateProduct(category.id, sub.id, product.id, 'style', e.target.value)}
          className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-900 text-sm" />
      </div>
      <div className="col-span-1 sm:col-span-2">
        <label className="block text-xs font-semibold text-amber-700 mb-1">Product Image *</label>
        <div className="flex items-center gap-3 flex-wrap">
          <label className="flex items-center gap-2 px-3 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 cursor-pointer text-sm font-medium transition-colors">
            <Upload size={15} />
            {product.imagePreview || product.image_url ? 'Change Image' : 'Upload Image'}
            <input type="file" accept="image/*" className="hidden"
              onChange={e => handleImageUpload(category.id, sub.id, product.id, e.target.files[0])} />
          </label>
          {(product.imagePreview || product.image_url) && (
            <img src={product.imagePreview || product.image_url} alt="Preview"
              className="w-14 h-14 sm:w-16 sm:h-16 object-cover rounded-lg border-2 border-amber-300 shadow-sm" />
          )}
        </div>
      </div>
      <div className="col-span-1 sm:col-span-2">
        <label className="block text-xs font-semibold text-amber-700 mb-1">Product Details</label>
        <textarea value={product.details} rows="3" placeholder="Enter product details, specifications, materials, etc."
          onChange={e => updateProduct(category.id, sub.id, product.id, 'details', e.target.value)}
          className="w-full px-3 py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-900 text-sm resize-none" />
      </div>

      {/* Save button + status at the BOTTOM of the product card */}
      <div className="col-span-1 sm:col-span-2 flex items-center justify-between pt-3 mt-1 border-t-2 border-amber-200">
        <StatusBadge saved={product.saved} saving={product.saving} error={product.saveError} />
        <button
          type="button"
          onClick={() => saveProduct(category.id, sub.id, product.id)}
          disabled={product.saving}
          className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all disabled:opacity-50 shadow-md
            ${product.saved
              ? 'bg-green-100 text-green-700 hover:bg-green-200 border-2 border-green-300'
              : 'bg-green-500 text-white hover:bg-green-600'}`}>
          {product.saving ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />}
          {product.saved ? 'Update Product' : 'Save Product'}
        </button>
      </div>
    </div>
  </div>
)

// ── Main Dashboard ─────────────────────────────────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate()
  const [mode, setMode] = useState('add')
  const [searchPostNo, setSearchPostNo] = useState('')
  const [searching, setSearching] = useState(false)
  const [postNo, setPostNo] = useState('')
  const [categories, setCategories] = useState([])
  const [message, setMessage] = useState({ type: '', text: '' })
  const [collapsedCats, setCollapsedCats] = useState({})
  const [collapsedSubs, setCollapsedSubs] = useState({})
  const [editLoaded, setEditLoaded] = useState(false)
  const [allPostNos, setAllPostNos] = useState([])
  const [showDropdown, setShowDropdown] = useState(false)

  const handleLogout = () => { localStorage.removeItem('wingora_is_admin'); navigate('/admin') }

  // Load all post numbers when edit mode is active
  useEffect(() => {
    if (mode === 'edit') fetchAllPostNos()
  }, [mode])

  const resetForm = () => {
    setPostNo(''); setCategories([])
    setSearchPostNo(''); setMessage({ type: '', text: '' })
    setCollapsedCats({}); setCollapsedSubs({})
    setEditLoaded(false)
  }

  // ── Fetch all post numbers for dropdown ──────────────────────────────────────
  const fetchAllPostNos = async () => {
    try {
      const { data } = await supabase.from('categories').select('post_no')
      if (data) {
        const unique = [...new Set(data.map(r => r.post_no))].sort()
        setAllPostNos(unique)
      }
    } catch (_) {}
  }

  const cleanPost = (raw) => raw.startsWith('#') ? raw : `#${raw}`

  // ── Patch helpers ─────────────────────────────────────────────────────────────
  const setCatField  = (cid, fields) =>
    setCategories(p => p.map(c => c.id === cid ? { ...c, ...fields } : c))
  const setSubField  = (cid, sid, fields) =>
    setCategories(p => p.map(c => c.id === cid ? { ...c, subCategories: c.subCategories.map(s => s.id === sid ? { ...s, ...fields } : s) } : c))
  const setProdField = (cid, sid, pid, fields) =>
    setCategories(p => p.map(c => c.id === cid ? { ...c, subCategories: c.subCategories.map(s => s.id === sid ? { ...s, products: s.products.map(pr => pr.id === pid ? { ...pr, ...fields } : pr) } : s) } : c))

  // ── State mutators ────────────────────────────────────────────────────────────
  const addCategory   = () => setCategories(p => [...p, blankCat()])
  const updateCatName = (id, v) => setCatField(id, { name: v, saved: false })
  const removeCat     = (id) => setCategories(p => p.filter(c => c.id !== id))
  const toggleCat     = (id) => setCollapsedCats(p => ({ ...p, [id]: !p[id] }))

  const addSub        = (cid) => setCategories(p => p.map(c => c.id === cid ? { ...c, subCategories: [...c.subCategories, blankSub()] } : c))
  const updateSubName = (cid, sid, v) => setSubField(cid, sid, { name: v, saved: false })
  const removeSub     = (cid, sid) => setCategories(p => p.map(c => c.id === cid ? { ...c, subCategories: c.subCategories.filter(s => s.id !== sid) } : c))
  const toggleSub     = (id) => setCollapsedSubs(p => ({ ...p, [id]: !p[id] }))

  const addProduct    = (cid, sid) => setCategories(p => p.map(c => c.id === cid ? { ...c, subCategories: c.subCategories.map(s => s.id === sid ? { ...s, products: [...s.products, blankProduct()] } : s) } : c))
  const updateProduct = (cid, sid, pid, field, value) => setProdField(cid, sid, pid, { [field]: value, saved: false })
  const removeProduct = (cid, sid, pid) => setCategories(p => p.map(c => c.id === cid ? { ...c, subCategories: c.subCategories.map(s => s.id === sid ? { ...s, products: s.products.filter(pr => pr.id !== pid) } : s) } : c))

  const handleImageUpload = (cid, sid, pid, file) => {
    if (!file) return
    setProdField(cid, sid, pid, { image: file, image_url: '', saved: false })
    const reader = new FileReader()
    reader.onloadend = () => setProdField(cid, sid, pid, { imagePreview: reader.result })
    reader.readAsDataURL(file)
  }

  // ── Upload image to storage ───────────────────────────────────────────────────
  const uploadImage = async (file, path) => {
    const ext = file.name.split('.').pop()
    const filePath = `${path}/${Date.now()}_${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage.from('ammaira-products').upload(filePath, file, { upsert: true, cacheControl: '3600' })
    if (error) throw error
    const { data } = supabase.storage.from('ammaira-products').getPublicUrl(filePath)
    return data.publicUrl
  }

  // ── Search (edit mode) ────────────────────────────────────────────────────────
  const handleSearch = async () => {
    const clean = searchPostNo.trim()
    if (!clean) return
    setSearching(true)
    setMessage({ type: '', text: '' })
    try {
      const searchVal = clean.startsWith('#') ? clean : `#${clean}`
      const [
        { data: catRows }, { data: subRows },
        { data: prodRows }, { data: detailRows }
      ] = await Promise.all([
        supabase.from('categories').select('*').eq('post_no', searchVal).order('id'),
        supabase.from('sub_categories').select('*').eq('post_no', searchVal).order('id'),
        supabase.from('products').select('*').eq('post_no', searchVal).order('id'),
        supabase.from('product_details').select('*').eq('post_no', searchVal),
      ])
      if (!catRows?.length) { setMessage({ type: 'error', text: `Post "${searchVal}" not found.` }); return }
      setPostNo(catRows[0].post_no)
      setCategories(dbRowsToState(catRows, subRows || [], prodRows || [], detailRows || []))
      setEditLoaded(true)
      setMessage({ type: 'success', text: `Post "${catRows[0].post_no}" loaded! Each item has its own Save/Update button.` })
    } catch (err) {
      setMessage({ type: 'error', text: 'Error: ' + err.message })
    } finally { setSearching(false) }
  }

  // ── Save Category ─────────────────────────────────────────────────────────────
  const saveCategory = async (cid) => {
    const cat = categories.find(c => c.id === cid)
    if (!cat) return
    if (!postNo.trim()) { setMessage({ type: 'error', text: 'Enter a post number first.' }); return }
    if (!cat.name.trim()) { setCatField(cid, { saveError: 'Name required' }); return }

    setCatField(cid, { saving: true, saveError: '' })
    try {
      const pn = cleanPost(postNo.trim())
      if (cat.dbId) {
        const { error } = await supabase.from('categories').update({ name: cat.name.trim() }).eq('id', cat.dbId)
        if (error) throw error
      } else {
        // Check post exists, if not create it (no explicit posts table — post_no lives in categories)
        const { data, error } = await supabase.from('categories')
          .insert({ post_no: pn, name: cat.name.trim() }).select('id').single()
        if (error) throw error
        setCatField(cid, { dbId: data.id })
      }
      setCatField(cid, { saved: true, saving: false, saveError: '' })
    } catch (err) {
      setCatField(cid, { saving: false, saveError: err.message })
    }
  }

  // ── Save Sub-Category ─────────────────────────────────────────────────────────
  const saveSub = async (cid, sid) => {
    const cat = categories.find(c => c.id === cid)
    const sub = cat?.subCategories.find(s => s.id === sid)
    if (!cat || !sub) return
    if (!cat.dbId)      { setSubField(cid, sid, { saveError: 'Save the category first' }); return }
    if (!sub.name.trim()) { setSubField(cid, sid, { saveError: 'Name required' }); return }

    setSubField(cid, sid, { saving: true, saveError: '' })
    try {
      const pn = cleanPost(postNo.trim())
      if (sub.dbId) {
        const { error } = await supabase.from('sub_categories').update({ name: sub.name.trim() }).eq('id', sub.dbId)
        if (error) throw error
      } else {
        const { data, error } = await supabase.from('sub_categories')
          .insert({ post_no: pn, category_id: cat.dbId, name: sub.name.trim() }).select('id').single()
        if (error) throw error
        setSubField(cid, sid, { dbId: data.id })
      }
      setSubField(cid, sid, { saved: true, saving: false, saveError: '' })
    } catch (err) {
      setSubField(cid, sid, { saving: false, saveError: err.message })
    }
  }

  // ── Save Product ──────────────────────────────────────────────────────────────
  const saveProduct = async (cid, sid, pid) => {
    const cat  = categories.find(c => c.id === cid)
    const sub  = cat?.subCategories.find(s => s.id === sid)
    const prod = sub?.products.find(p => p.id === pid)
    if (!cat || !sub || !prod) return

    if (!cat.dbId)                  { setProdField(cid, sid, pid, { saveError: 'Save the category first' }); return }
    if (!sub.dbId)                  { setProdField(cid, sid, pid, { saveError: 'Save the sub-category first' }); return }
    if (!prod.name.trim())          { setProdField(cid, sid, pid, { saveError: 'Name required' }); return }
    if (!prod.product_code.trim())  { setProdField(cid, sid, pid, { saveError: 'Product code required' }); return }
    if (!prod.rate.toString().trim()) { setProdField(cid, sid, pid, { saveError: 'Rate required' }); return }
    if (!prod.colour.trim())        { setProdField(cid, sid, pid, { saveError: 'Colour required' }); return }

    setProdField(cid, sid, pid, { saving: true, saveError: '' })
    try {
      const pn          = cleanPost(postNo.trim())
      const productCode = prod.product_code.trim().toUpperCase()

      let imageUrl = prod.image_url || ''
      if (prod.image) {
        imageUrl = await uploadImage(prod.image, `products/${pn}/${cat.name}/${sub.name}`)
        setProdField(cid, sid, pid, { image_url: imageUrl, image: null, imagePreview: imageUrl })
      }
      if (!imageUrl) { setProdField(cid, sid, pid, { saving: false, saveError: 'Image required' }); return }

      const productData = {
        post_no: pn, sub_category_id: sub.dbId,
        name: prod.name.trim(), product_code: productCode,
        rate: parseFloat(prod.rate) || 0, count: parseInt(prod.count) || 0,
        style: prod.style.trim(), colour: prod.colour.trim(), image_url: imageUrl,
      }

      if (prod.dbId) {
        // Update existing
        const { error: e1 } = await supabase.from('products').update(productData).eq('id', prod.dbId)
        if (e1) throw e1
        // Delete then re-insert product_details (avoids needing a unique constraint)
        await supabase.from('product_details').delete().eq('product_code', productCode)
        const { error: e2 } = await supabase.from('product_details')
          .insert({ post_no: pn, product_code: productCode, details: prod.details || '' })
        if (e2) throw e2
      } else {
        // Insert new
        const { data: prodRow, error: e1 } = await supabase.from('products')
          .insert(productData).select('id').single()
        if (e1) throw e1
        const { error: e2 } = await supabase.from('product_details')
          .insert({ post_no: pn, product_code: productCode, details: prod.details || '' })
        if (e2) throw e2
        setProdField(cid, sid, pid, { dbId: prodRow.id, product_code: productCode })
      }

      setProdField(cid, sid, pid, { saved: true, saving: false, saveError: '' })
    } catch (err) {
      setProdField(cid, sid, pid, { saving: false, saveError: err.message })
    }
  }

  const isEditLoaded = mode === 'edit' && editLoaded

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-rose-50">

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-sm shadow-md border-b-2 border-amber-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center gap-3">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-3xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent leading-tight">
              Aamira Jewellery
            </h1>
            <p className="text-xs sm:text-sm text-amber-700 mt-0.5">Admin Dashboard</p>
          </div>
          <button onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 sm:px-4 py-2 bg-rose-500 text-white rounded-lg hover:bg-rose-600 transition-colors shadow-md text-sm whitespace-nowrap flex-shrink-0">
            <LogOut size={15} /> Logout
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-3 sm:px-6 py-4 sm:py-8 space-y-4 sm:space-y-6">

        {/* Mode Tabs */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-md border border-amber-100 p-1.5 sm:p-2 flex gap-1.5 sm:gap-2">
          <button type="button" onClick={() => { setMode('add'); resetForm() }}
            className={`flex-1 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 sm:gap-2
              ${mode === 'add' ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white shadow-md' : 'text-amber-700 hover:bg-amber-50'}`}>
            <Plus size={14} /> Add New Post
          </button>
          <button type="button" onClick={() => { setMode('edit'); resetForm() }}
            className={`flex-1 py-2.5 sm:py-3 rounded-xl font-semibold text-xs sm:text-sm transition-all flex items-center justify-center gap-1.5 sm:gap-2
              ${mode === 'edit' ? 'bg-gradient-to-r from-rose-500 to-pink-500 text-white shadow-md' : 'text-amber-700 hover:bg-amber-50'}`}>
            <Edit3 size={14} /> Edit Existing Post
          </button>
        </div>

        {/* Edit: Search */}
        {mode === 'edit' && !isEditLoaded && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-6 border border-amber-100">
            <h2 className="text-base sm:text-lg font-bold text-amber-900 mb-4 flex items-center gap-2">
              <Search size={18} className="text-amber-500" /> Search Post to Edit
            </h2>
            <div className="flex gap-2 sm:gap-3">
              <div className="flex-1 min-w-0 relative">
                <input
                  type="text"
                  value={searchPostNo}
                  onChange={e => {
                    setSearchPostNo(e.target.value)
                    setShowDropdown(true)
                  }}
                  onFocus={() => setShowDropdown(true)}
                  onBlur={() => setTimeout(() => setShowDropdown(false), 150)}
                  onKeyDown={e => e.key === 'Enter' && handleSearch()}
                  placeholder="Enter post number e.g. 1"
                  className="w-full px-3 sm:px-4 py-2.5 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-900 placeholder-amber-400 text-sm" />
                {/* Dropdown suggestions */}
                {showDropdown && allPostNos.filter(p => {
                  const q = searchPostNo.trim()
                  if (!q) return true
                  const normalized = q.startsWith('#') ? q : `#${q}`
                  return p.toLowerCase().includes(normalized.toLowerCase()) || p.replace('#','').includes(q)
                }).length > 0 && (
                  <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border-2 border-amber-200 rounded-xl shadow-xl overflow-hidden max-h-48 overflow-y-auto">
                    {allPostNos.filter(p => {
                      const q = searchPostNo.trim()
                      if (!q) return true
                      const normalized = q.startsWith('#') ? q : `#${q}`
                      return p.toLowerCase().includes(normalized.toLowerCase()) || p.replace('#','').includes(q)
                    }).map(postNum => (
                      <button
                        key={postNum}
                        type="button"
                        onMouseDown={() => {
                          setSearchPostNo(postNum.replace('#', ''))
                          setShowDropdown(false)
                        }}
                        className="w-full text-left px-4 py-2.5 text-sm text-amber-900 hover:bg-amber-50 border-b border-amber-100 last:border-0 font-medium flex items-center gap-2">
                        <span className="text-amber-400 text-xs font-bold">#</span>
                        {postNum.replace('#', '')}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button type="button" onClick={handleSearch} disabled={searching}
                className="px-4 sm:px-6 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-semibold hover:from-amber-600 hover:to-orange-600 transition-all shadow-md disabled:opacity-50 flex items-center gap-1.5 text-sm whitespace-nowrap">
                <Search size={15} /> {searching ? 'Searching...' : 'Search'}
              </button>
            </div>
            {message.text && (
              <div className={`mt-4 p-3 rounded-xl text-sm font-medium ${message.type === 'success' ? 'bg-green-50 border border-green-300 text-green-800' : 'bg-rose-50 border border-rose-300 text-rose-800'}`}>
                {message.text}
              </div>
            )}
          </div>
        )}

        {/* Main Panel */}
        {(mode === 'add' || isEditLoaded) && (
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-4 sm:p-8 border border-amber-100">

            <div className="flex items-start sm:items-center justify-between mb-5 sm:mb-6 gap-2">
              <h2 className="text-lg sm:text-2xl font-bold text-amber-900 flex items-center gap-2">
                <span className="w-2 h-6 sm:h-8 bg-gradient-to-b from-amber-500 to-rose-500 rounded-full flex-shrink-0"></span>
                {mode === 'edit' ? `Editing Post ${postNo}` : 'Add New Post'}
              </h2>
              {mode === 'edit' && (
                <button type="button" onClick={resetForm}
                  className="flex items-center gap-1 text-xs sm:text-sm text-amber-600 hover:text-rose-600 transition-colors whitespace-nowrap flex-shrink-0">
                  <X size={14} /> Search different post
                </button>
              )}
            </div>

            <div className="space-y-6 sm:space-y-8">

              {/* Post Number (add mode only) */}
              {mode === 'add' && (
                <div>
                  <label className="block text-sm font-semibold text-amber-800 mb-2">Post Number *</label>
                  <input type="text" value={postNo} onChange={e => setPostNo(e.target.value)}
                    placeholder="Enter post number e.g. 1"
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-amber-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white/80 text-amber-900 placeholder-amber-400 text-sm" />
                  {postNo.trim() && (
                    <p className="text-xs text-amber-500 mt-1.5">
                      Saving as <strong>{cleanPost(postNo.trim())}</strong> — add categories below, each saves instantly.
                    </p>
                  )}
                </div>
              )}

              {/* Global message */}
              {message.text && (
                <div className={`p-3 sm:p-4 rounded-xl font-medium text-sm ${message.type === 'success' ? 'bg-green-50 border-2 border-green-300 text-green-800' : 'bg-rose-50 border-2 border-rose-300 text-rose-800'}`}>
                  {message.text}
                </div>
              )}

              {/* Categories */}
              <div className="space-y-3 sm:space-y-4">
                {categories.map((category) => (
                  <div key={category.id} className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-xl border-2 border-amber-300 shadow-sm overflow-hidden">

                    {/* Category header */}
                    <div className="p-3 sm:p-4">
                      {/* Row 1: collapse + input + delete */}
                      <div className="flex items-center gap-2">
                        <button type="button" onClick={() => toggleCat(category.id)} className="text-amber-600 hover:text-amber-800 flex-shrink-0">
                          {collapsedCats[category.id] ? <ChevronDown size={16} /> : <ChevronUp size={16} />}
                        </button>
                        <input type="text" value={category.name}
                          onChange={e => updateCatName(category.id, e.target.value)}
                          placeholder="Category name e.g. Bangle"
                          className="flex-1 min-w-0 px-2 sm:px-3 py-2 border-2 border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-900 font-semibold text-sm" />
                        <span className="text-xs text-amber-500 font-medium whitespace-nowrap hidden sm:block">
                          {category.subCategories.length} sub{category.subCategories.length !== 1 ? 's' : ''}
                        </span>
                        <button type="button" onClick={() => removeCat(category.id)}
                          className="p-1.5 sm:p-2 text-rose-500 hover:bg-rose-100 rounded-lg transition-colors flex-shrink-0">
                          <Trash2 size={15} />
                        </button>
                      </div>
                      {/* Row 2: status + save button (full width on mobile) */}
                      <div className="flex items-center justify-between mt-2 sm:mt-0 sm:hidden">
                        <StatusBadge saved={category.saved} saving={category.saving} error={category.saveError} />
                        <button type="button" onClick={() => saveCategory(category.id)} disabled={category.saving}
                          className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all disabled:opacity-50
                            ${category.saved ? 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-300' : 'bg-amber-500 text-white hover:bg-amber-600'}`}>
                          {category.saving ? <Loader2 size={11} className="animate-spin" /> : <Save size={11} />}
                          {category.saved ? 'Update Category' : 'Save Category'}
                        </button>
                      </div>
                      {/* Desktop: inline status + save (hidden on mobile) */}
                      <div className="hidden sm:flex items-center gap-2 mt-2">
                        <StatusBadge saved={category.saved} saving={category.saving} error={category.saveError} />
                        <button type="button" onClick={() => saveCategory(category.id)} disabled={category.saving}
                          className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50 ml-auto
                            ${category.saved ? 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-300' : 'bg-amber-500 text-white hover:bg-amber-600'}`}>
                          {category.saving ? <Loader2 size={11} className="animate-spin" /> : <Save size={11} />}
                          {category.saved ? 'Update' : 'Save Category'}
                        </button>
                      </div>
                    </div>

                    {/* Category body */}
                    {!collapsedCats[category.id] && (
                      <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-2 sm:space-y-3 border-t border-amber-200">
                        {!category.dbId ? (
                          <p className="text-xs text-amber-600 bg-amber-100 rounded-lg px-3 py-2 mt-3 flex items-center gap-1.5">
                            <AlertCircle size={12} /> Save the category above before adding sub-categories.
                          </p>
                        ) : (
                          <>
                            <p className="text-xs font-bold uppercase tracking-widest text-amber-600 pt-3">Sub-Categories</p>

                            {category.subCategories.map((sub) => (
                              <div key={sub.id} className="bg-white rounded-xl border border-amber-200 shadow-sm overflow-hidden">

                                {/* Sub header */}
                                <div className="p-2.5 sm:p-3">
                                  {/* Row 1: collapse + input + delete */}
                                  <div className="flex items-center gap-2">
                                    <button type="button" onClick={() => toggleSub(sub.id)} className="text-amber-500 hover:text-amber-700 flex-shrink-0">
                                      {collapsedSubs[sub.id] ? <ChevronDown size={15} /> : <ChevronUp size={15} />}
                                    </button>
                                    <input type="text" value={sub.name}
                                      onChange={e => updateSubName(category.id, sub.id, e.target.value)}
                                      placeholder="Sub-category e.g. Anti-Tarnish Bangle"
                                      className="flex-1 min-w-0 px-2 sm:px-3 py-1.5 sm:py-2 border border-amber-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-400 bg-white text-amber-800 text-sm font-medium" />
                                    <span className="text-xs text-amber-400 whitespace-nowrap hidden sm:block">
                                      {sub.products.length} product{sub.products.length !== 1 ? 's' : ''}
                                    </span>
                                    <button type="button" onClick={() => removeSub(category.id, sub.id)}
                                      className="p-1 text-rose-400 hover:bg-rose-50 rounded transition-colors flex-shrink-0">
                                      <Trash2 size={14} />
                                    </button>
                                  </div>
                                  {/* Row 2: status + save (mobile only) */}
                                  <div className="flex items-center justify-between mt-2 sm:hidden">
                                    <StatusBadge saved={sub.saved} saving={sub.saving} error={sub.saveError} />
                                    <button type="button" onClick={() => saveSub(category.id, sub.id)} disabled={sub.saving}
                                      className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold transition-all disabled:opacity-50
                                        ${sub.saved ? 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-300' : 'bg-amber-500 text-white hover:bg-amber-600'}`}>
                                      {sub.saving ? <Loader2 size={11} className="animate-spin" /> : <Save size={11} />}
                                      {sub.saved ? 'Update Sub' : 'Save Sub'}
                                    </button>
                                  </div>
                                  {/* Desktop: inline (hidden on mobile) */}
                                  <div className="hidden sm:flex items-center gap-2 mt-1.5">
                                    <StatusBadge saved={sub.saved} saving={sub.saving} error={sub.saveError} />
                                    <button type="button" onClick={() => saveSub(category.id, sub.id)} disabled={sub.saving}
                                      className={`flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-bold transition-all disabled:opacity-50 ml-auto
                                        ${sub.saved ? 'bg-green-100 text-green-700 hover:bg-green-200 border border-green-300' : 'bg-amber-500 text-white hover:bg-amber-600'}`}>
                                      {sub.saving ? <Loader2 size={11} className="animate-spin" /> : <Save size={11} />}
                                      {sub.saved ? 'Update' : 'Save Sub'}
                                    </button>
                                  </div>
                                </div>

                                {/* Products */}
                                {!collapsedSubs[sub.id] && (
                                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 space-y-2 sm:space-y-3 border-t border-amber-100">
                                    {!sub.dbId ? (
                                      <p className="text-xs text-amber-600 bg-amber-100 rounded-lg px-3 py-2 mt-3 flex items-center gap-1.5">
                                        <AlertCircle size={12} /> Save the sub-category above before adding products.
                                      </p>
                                    ) : (
                                      <>
                                        <p className="text-xs font-bold uppercase tracking-widest text-orange-500 pt-3">Products</p>
                                        {sub.products.map((product, productIndex) => (
                                          <ProductForm
                                            key={product.id}
                                            category={category} sub={sub} product={product}
                                            productIndex={productIndex}
                                            updateProduct={updateProduct}
                                            removeProduct={removeProduct}
                                            handleImageUpload={handleImageUpload}
                                            saveProduct={saveProduct}
                                          />
                                        ))}
                                        <button type="button" onClick={() => addProduct(category.id, sub.id)}
                                          className="flex items-center gap-2 px-3 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 transition-colors text-xs font-semibold w-full justify-center border border-orange-200">
                                          <Plus size={13} /> Add Product
                                        </button>
                                      </>
                                    )}
                                  </div>
                                )}
                              </div>
                            ))}

                            <button type="button" onClick={() => addSub(category.id)}
                              className="flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors text-xs sm:text-sm font-semibold w-full justify-center border border-amber-300">
                              <Plus size={14} /> Add Sub-Category
                            </button>
                          </>
                        )}
                      </div>
                    )}
                  </div>
                ))}

                {/* Add Category button */}
                <button type="button"
                  onClick={() => {
                    if (mode === 'add' && !postNo.trim()) {
                      setMessage({ type: 'error', text: 'Enter a post number first.' })
                      return
                    }
                    setMessage({ type: '', text: '' })
                    addCategory()
                  }}
                  className="flex items-center gap-2 px-4 sm:px-6 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg w-full justify-center font-semibold text-sm sm:text-base">
                  <Plus size={18} /> Add Category
                </button>
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  )
}